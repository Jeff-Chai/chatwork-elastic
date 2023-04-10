const EXECUTE_UNIT = 200;

const RoomList = (function () {
    let listItemCount = 0;

    const get = () => listItemCount;
    const set = (num) => listItemCount = num;
    const update = () => listItemCount = [...document.querySelectorAll('#RoomList li[role="listitem"]')].length;

    return {
        get,
        set,
        update,
    };
})();

const displayPophover = () => {
    // Create pophover
    if (!document.querySelector('#custom-pophover')) {
        const styles = `
            display: none;
            position: absolute;
            z-index: 9999;
            border: 2px solid black;
            padding: 2px 6px;
            border-radius: 10px;
            background-color: white;
        `;
        const base = document.createElement('div');
        base.id = 'custom-pophover';
        base.style.cssText = styles;

        document.querySelector('body').appendChild(base);
    }

    const pophover = document.querySelector('#custom-pophover');

    const hoverIn = function () {
        const position = this.getBoundingClientRect();
        let content = this.querySelector('p').textContent;

        pophover.textContent = content;
        pophover.style.top = (position.top - 27.5) + 'px';
        pophover.style.left = position.left + 'px';

        pophover.style.display = 'block';
    };
    const hoverOut = function () {
        pophover.style.display = 'none';
    };

    [...document.querySelectorAll('#RoomList li[role="listitem"]')].map(el => {
        el.removeEventListener('mouseenter', hoverIn);
        el.removeEventListener('mouseleave', hoverOut);

        el.addEventListener('mouseenter', hoverIn);
        el.addEventListener('mouseleave', hoverOut);
    });
};

// Event : Show Room List (#sidebarSwitch button._showDescription)
const showTalkListButtonEventListener = () => {

    document.querySelector('#sidebarSwitch button._showDescription').addEventListener('click', function () {
        RoomList.set(0);

        const exec = setInterval(() => {
            if (RoomList.get() == 0) {
                RoomList.update();
                return ;
            }

            displayPophover();
            showMoreTalksButtonEventListener();

            clearInterval(exec);
        }, EXECUTE_UNIT);
    });
};

// Event : Show More (#RoomList button)
const showMoreTalksButtonEventListener = () => {
    document.querySelector('#RoomList button').addEventListener('click', function () {
        const beforeListItemsCount = RoomList.get();

        const exec = setInterval(() => {
            RoomList.update();

            if (beforeListItemsCount == RoomList.get()) {
                return ;
            }

            displayPophover();

            clearInterval(exec);
        }, EXECUTE_UNIT);
    });
};

(function () {
    const init = setInterval(() => {
        if (RoomList.get() == 0) {
            RoomList.update();
            return ;
        }

        // pophover init
        displayPophover();

        // bind event
        showTalkListButtonEventListener();
        showMoreTalksButtonEventListener();

        clearInterval(init);
    }, EXECUTE_UNIT);
})()
