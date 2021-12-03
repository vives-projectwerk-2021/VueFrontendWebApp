<template>
  <v-footer padless>
        <v-card
            flat
            tile
            class="text-center"
            width="100%"
            color="grey lighten-2"
        >
        <v-card-text>
            <v-row class="py-1" justify="center" align="center">
                <v-btn
                    v-for="icon in icons_one"
                    :key="icon.id"
                    class="mx-4"
                    :href="icon.link"
                    icon
                >
                <v-icon size="24px">
                    {{ icon.image }}
                </v-icon>
                </v-btn>
                <a href="https://www.vives.be" color="grey lighten-2" class="mx-5">
                    <v-img :src="logo_vives" max-height="28px" max-width="24px"></v-img>
                </a>
                <v-btn
                    v-for="icon in icons_two"
                    :key="icon.id"
                    class="mx-4"
                    :href="icon.link"
                    icon
                >
                <v-icon size="24px">
                    {{ icon.image }}
                </v-icon>
                </v-btn>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>Pulu</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>

export default {
    name: 'Footer',

    data() {
        return {
            logo_vives: require('@/img/logo_vives.png'),
            icons_one: [
                {
                    id: 0,
                    image: 'mdi-github',
                    link: 'https://github.com/vives-projectwerk-2021'
                },
                {
                    id: 1,
                    image: 'mdi-email',
                    link: ''
                },
            ],

            icons_two: [
                {
                    id: 2,
                    image: 'mdi-facebook',
                    link: 'https://www.facebook.com/viveshogeschool'
                },
                {
                    id:3,
                    image: 'mdi-twitter',
                    link: 'https://twitter.com/viveshogeschool'
                }
            ]
        }
    }
}
</script>