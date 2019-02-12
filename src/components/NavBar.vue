<template>
      <header class="header" id="header">

        <a href="/" class="logo">
            <img src="../assets/vueSchool.svg" >
        </a>

        <div class="btn-hamburger">
            <!-- use .btn-humburger-active to open the menu -->
            <div class="top bar"></div>
            <div class="middle bar"></div>
            <div class="bottom bar"></div>
        </div>

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
        <ul v-if="user">
            <li class="navbar-user">
                <a @click="displayDropDown =!displayDropDown">
                    <img class="avatar-small" :src="user.avatar" alt="">
                    <span>
                        {{user.name}}
                        <img class="icon-profile" src="../assets/arrow-profile.svg" alt="">
                    </span>
                </a>

                <!-- dropdown menu -->
                <!-- add class "active-drop" to show the dropdown -->
                <div id="user-dropdown" :class="{'active-drop': displayDropDown}">
                    <div class="triangle-drop"></div>
                    <ul class="dropdown-menu">
                        <li class="dropdown-menu-item">
                            <router-link :to="{name: 'profile'}">View Profile</router-link>
                        </li>
                        <li class="dropdown-menu-item">
                            <a @click.prevent="$store.dispatch('signOut')">Sign Out</a>
                        </li> 
                        
                   </ul>
                </div>
            </li>
            
        </ul>
        <ul class="loginNav" v-else>
            <router-link :to="{name: 'login'}">Sign In</router-link>
            <router-link :to="{name: 'register'}">Register</router-link>
        </ul>

        <!-- <ul>
            <li class="navbar-item">
                <a href="index.html">Home</a>
            </li>
            <li class="navbar-item">
                <a href="category.html">Category</a>
            </li>
            <li class="navbar-item">
                <a href="forum.html">Forum</a>
            </li>
            <li class="navbar-item">
                <a href="thread.html">Thread</a>
            </li> -->
            <!-- Show these option only on mobile-->
            <!-- <li class="navbar-item mobile-only">
                <a href="profile.html">My Profile</a>
            </li>
            <li class="navbar-item mobile-only">
                <a href="#">Logout</a>
            </li>
        </ul> -->
    </nav>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            displayDropDown: false
        }
    },
    computed: {
        ...mapGetters({
            'user': 'authUser'
        })
    },
    mounted(){
        console.log(this.user)
    }
}
</script>


<style lang="scss" scoped>
    .header{
        .loginNav{
            a{
                color: white;
                padding: 0 1em;
            }
        }
    }
</style>


