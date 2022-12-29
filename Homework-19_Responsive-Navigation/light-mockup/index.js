const switcher = document.querySelector('.switcher-view');
const nav = document.querySelector('.sidebar-nav');

switcher.onclick = function() {
    if (nav.classList.contains('sidebar-nav-short')) {
        nav.classList.remove('sidebar-nav-short');
    } else {
        nav.classList.add('sidebar-nav-short')
    }
}