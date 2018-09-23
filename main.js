const rightCol = '.col-md-4';
const leftCol = '.col-md-8';
const navbar = '.navbar';
const target = '#the-target';
const accordion = '#accordion';
const targetMargin = 30;

const init = () => {
    const getElementHeight = element => document.querySelector(element).getBoundingClientRect().height;
    const getElementBottom = element => document.querySelector(element).getBoundingClientRect().bottom;
    const getElementTop = element => document.querySelector(element).getBoundingClientRect().top;
    const rightColSelector = document.querySelector(rightCol);
    const mutationObserverConfig = {attributes: true, childList: true, subtree: true};
    const navbarHeight = getElementHeight(navbar);
    const sidebarHeight = getElementHeight(target);
    const sidebarSelector = document.querySelector(target);
    let stuckOffsetBottom = getElementBottom(leftCol) - targetMargin;
    let sidebarOffsetTop = getElementBottom(accordion) + window.scrollY;
    let leftColumnHeight = getElementHeight(leftCol);
    let rightColumnHeight = getElementHeight(rightCol);

    const fixBanner = () => {
        if (leftColumnHeight > rightColumnHeight) {
            if (window.scrollY + navbarHeight > sidebarOffsetTop) {
                sidebarSelector.classList.add("fixed");
            } else {
                sidebarSelector.classList.remove("fixed");
            }

            if (sidebarHeight + navbarHeight >= stuckOffsetBottom) {
                sidebarSelector.style.top = sidebarHeight - stuckOffsetBottom < 0 ? Math.abs(sidebarHeight - stuckOffsetBottom) + "px" : "-" + (sidebarHeight - stuckOffsetBottom) + "px";
            } else {
                sidebarSelector.style.top = navbarHeight + "px";
            }
        }
    };

    const observerCallback = () => {
        leftColumnHeight = getElementHeight(leftCol) + getElementTop(leftCol);
        rightColumnHeight = getElementHeight(rightCol) + getElementTop(rightCol);
    };
    const columnObserver = new MutationObserver(observerCallback);

    columnObserver.observe(rightColSelector, mutationObserverConfig);

    fixBanner();

    window.onscroll = () => {
        stuckOffsetBottom = getElementBottom(leftCol) - targetMargin;
        sidebarOffsetTop = getElementBottom(accordion) + window.scrollY;

        fixBanner();
    };
};

document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        init();
    }
};