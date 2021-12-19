<template>
  <v-footer padless>
        <v-card
            flat
            tile
            class="text-center"
            width="100%"
            :color="this.$store.state.footerColor"
            dark
        >
        <v-card-text>
            <v-row class="py-1" justify="center" align="center">
                <v-btn
                    :key="icons_one.id"
                    class="mx-4"
                    :href="icons_one.link"
                    target="_blank"
                    icon
                >
                    <v-icon size="24px">
                        {{ icons_one.image }}
                    </v-icon>
                </v-btn>
                <v-btn
                    :key="icons_three.id"
                    class="mx-4"
                    icon
                    @click="sendMail"
                >
                    <v-icon>
                        {{ icons_three.image }}
                    </v-icon>
                </v-btn>
                <a href="https://www.vives.be" class="mx-5" target="_blank">
                    <v-img :src="logo_vives" max-height="28px" max-width="24px"></v-img>
                </a>
                <v-btn
                    v-for="icon in icons_two"
                    :key="icon.id"
                    class="mx-4"
                    :href="icon.link"
                    icon
                    target="_blank"
                >
                    <v-icon size="24px">
                        {{ icon.image }}
                    </v-icon>
                </v-btn>
            </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} — Pulu
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
            icons_one:
                {
                    id: 0,
                    image: 'mdi-github',
                    link: 'https://github.com/vives-projectwerk-2021'
                },
            icons_three:
                {
                    id: 1,
                    image: 'mdi-email',
                },

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
    },

    methods: {
        sendMail() {
            window.open('mailto:sille.vanlandschoot@vives.be?subject=pulu');
        }
    }
}
</script>