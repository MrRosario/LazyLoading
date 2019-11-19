document.addEventListener("DOMContentLoaded", function() {
    App.init();
});

let App = {
    init: function(){
        this.lazyloadImg();
        this.darkMode();
        this.currentTheme();
        this.currentImgMode();
    },
    lazyloadImg: function() {
        
        let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let img = entry.target;

                         img.setAttribute('src', img.dataset.src);
                         img.classList.add('fade');

                        lazyImageObserver.unobserve(img);
                    }
                });
            });
        
            lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
            });
        }
    },
    currentTheme: function(){
        let body = document.getElementById("body");
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

        if(currentTheme){
            body.className  = currentTheme;
        }
    },
    currentImgMode: function(){
        let img_mode = document.getElementById("img_mode");
        const currentImg = localStorage.getItem('modeImg') ? localStorage.getItem('modeImg') : null;

        if(currentImg){
            img_mode.setAttribute("src", currentImg);
        }
    },
    darkMode: function(){
        let img_mode = document.getElementById("img_mode");
        let _self    = this;

        img_mode.addEventListener("click", () => {
            if(img_mode.getAttribute('src') == "./imgs/icon_dark.svg"){
                
                img_mode.setAttribute("src", "./imgs/icon_light.svg");

                localStorage.setItem("modeImg", "./imgs/icon_light.svg");

                _self.toggleDarkLight("modeImg", "./imgs/icon_light.svg");
            }
            else{
                img_mode.setAttribute("src", "./imgs/icon_dark.svg");

                localStorage.setItem("modeImg", "./imgs/icon_dark.svg");

                _self.toggleDarkLight();
            }
        });
    },
    toggleDarkLight: function(){
        let body = document.getElementById("body");
        let currentClass = body.className;
        
        if(currentClass == "light-mode"){
             localStorage.setItem('theme', "dark-mode");
             body.className  = "dark-mode";
        }
        else{
            localStorage.setItem('theme', "light-mode");
            body.className  = "light-mode";
        }
    }
}