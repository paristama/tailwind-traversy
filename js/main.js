const wrapper = document.getElementById("wrapper");
const hamburger = document.getElementById("hamburger");
const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backdrop = document.createElement("div");

hamburger.addEventListener("click", function () {
    backdrop.id = "backdrop";
    backdrop.className =
        "z-[2] fixed w-screen h-screen left-0 top-0 bg-black/75 opacity-0 transition-opacity duration-[500ms]";
    backdrop.setAttribute("data-handle", "close_sidebar");
    mobileMenu.parentNode.append(backdrop);

    document.body.toggleAttribute("open");
    // reflow it's element to make transition work after append
    void backdrop.offsetWidth;
    backdrop.classList.add("group-open:opacity-100");
});

document.addEventListener("click", function (e) {
    // close by element id
    // const elementIDs = ["backdrop", "sidebarCloseBtn"];

    if (e.target.dataset.handle == "close_sidebar") {
        backdrop.classList.remove("group-open:opacity-100");

        setTimeout(() => {
            disposeElement(backdrop);
        }, getElementTransitionDuration(backdrop));

        document.body.removeAttribute("open");
    }
});

const disposeElement = (element) => element.remove();

const getElementTransitionDuration = (element) => {
    let { transitionDuration, transitionDelay } =
        window.getComputedStyle(element);

    transitionDuration = Number.parseFloat(transitionDuration);
    transitionDelay = Number.parseFloat(transitionDelay);

    return (transitionDuration + transitionDelay) * 1000;
};
