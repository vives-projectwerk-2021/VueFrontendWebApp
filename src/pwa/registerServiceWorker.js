/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (reg) {
      console.log('Service worker has been registered.')
      
      setInterval(()=> {
        console.log("Checking for update ...")
        reg.update();
      }, 1000 * 60 * 1);
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (reg) {
      console.log('New content is available; please refresh.')
      // Send out an event notification that we have new content available.
      document.dispatchEvent(new CustomEvent('swupdatefound', {
        detail: reg // or reg.waiting ?
      }));
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}