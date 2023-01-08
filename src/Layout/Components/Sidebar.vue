<template>
    <div class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        
        <div class="app-header__logo">
            
            <!--<div class="logo-src"/>-->
            <div class="app-header-left">
                <!-- <img class="img-logo-telefonica" alt=""> --> <!-- telefonica_cor -->
                 <!-- <img class="img-logo-vivo"  alt=""> --> <!-- vivo_cor --> 
            </div>
            
            
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu" @update:collapsed="onToggleCollapse" @item-click="onItemClick"/>
            </VuePerfectScrollbar>
        </div>

    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: 'SidebarDemonstracao',
        components: {
            SidebarMenu,
            VuePerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,
            
                menu: [
                    {
                        header: true,
                        title: 'Menu',
                    },
                    /*
                    {
                        title: 'Teste',
                        icon: 'pe-7s-photo-gallery',
                        child: [
                            {
                                href: '/teste',
                                title: 'Teste',
                            }
                        ]
                    },
                    */
                    {
                        title: 'Painel de Controle',
                        icon: 'pe-7s-photo',
                        href: '/controlPanel'
                       
                    },
                    {
                        title: 'Projeto',
                        icon: 'pe-7s-wallet',
                        href: '/projectList'
                    },
                    {
                        title: 'Administração',
                        icon: 'pe-7s-tools',
                        child: [
                            {
                                title: 'Cliente',
                                href: '/customerList'
                            },
                            {
                                title: 'Tipo de Licença',
                                href: '/licenseList'
                            },
                            {
                                title: 'Usuário',
                                href: '/userList'
                            },
                        ]
                    },

                    
                    
                    /*
                    {
                        title: 'Documento',
                        icon: 'pe-7s-photo',
                        child: [
                             {
                                href: '/docList',
                                title: 'Lista',
                            }
                        ]
                    },
                    */
                    
                    
                    /*
                    {
                        title: 'Documentos',
                        icon: 'pe-7s-photo-gallery',
                        child: [
                            {
                                href: '/viewdoc',
                                title: 'Visualizar Documento',
                            }
                        ]
                    }
                    */
                ],
                windowWidth: 0,
            }
        },
        props: {
            sidebarbg: String,
            collapsed: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            onItemClick(event, item) {
                console.log(event);
                console.log(item);
                
               if(item.href){

                    this.isOpen = !this.isOpen;
                    const el = document.body;
                    el.classList.remove("closed-sidebar-open");
                    
                    this.$localStorage.set('isOpen', false)

                    console.log('fechar')
               }
            },
            onToggleCollapse(collapsed) {
                console.log(collapsed)
            },
            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                console.log( this.isOpen )

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1350') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>

<style>

.img-logo-telefonica{
    width:220px;
    height:130px;
    content: url("@/assets/images/logo.png");
}

.img-logo-vivo{
    height:55px;
    content: url("@/assets/images/logo.png");
}

</style>