

function waitForElementId(id) {
    return new Promise(resolve => {
        if (document.getElementById(id)) {
            return resolve(document.querySelector(id));
        }

        const observer = new MutationObserver(mutations => {
            if (document.getElementById(id)) {
                observer.disconnect();
                resolve(document.getElementById(id));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

export default waitForElementId;