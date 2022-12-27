const switcher = document.querySelector('.switch--view');
const navBar =  document.querySelector('.sidebar-nav');
switcher.onclick = function() {
    if (!switcher.classList.contains('switch-view__full')) {
       switcher.classList.add('switch-view__full');
       navBar.classList.add('sidebar-nav__full');
    } else {
        switcher.classList.remove('switch-view__full');
        navBar.classList.remove('sidebar-nav__full');
    }

}
