document.addEventListener('DOMContentLoaded', () => {
    const pictures = document.querySelectorAll('.picture');

    const updateElementPosition = (element, deltaX, deltaY) => {
        const currentTop = parseInt(element.style.top || 0, 10);
        const currentLeft = parseInt(element.style.left || 0, 10);
        element.style.top = `${currentTop + deltaY}px`;
        element.style.left = `${currentLeft + deltaX}px`;
    };

    const handleMove = (element, event) => {
        const touch = event.touches ? event.touches[0] : event;
        const deltaX = touch.clientX - (element.startX || touch.clientX);
        const deltaY = touch.clientY - (element.startY || touch.clientY);

        element.startX = touch.clientX;
        element.startY = touch.clientY;

        updateElementPosition(element, deltaX, deltaY);
    };

    const startDrag = (event) => {
        const element = event.currentTarget;
        element.startX = element.startY = null;

        const onMove = (event) => handleMove(element, event);
        const onStop = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onStop);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onStop);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onStop);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', onStop);

        handleMove(element, event);
    };

    pictures.forEach(picture => {
        const range = 80;
        const randomX = Math.random() * (range * 2) - range;
        const randomY = Math.random() * (range * 2) - range;
        const randomRotate = Math.random() * (range / 2) - range / 4;

        picture.style.top = `${randomY}px`;
        picture.style.left = `${randomX}px`;
        picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;

        picture.addEventListener('mousedown', startDrag);
        picture.addEventListener('touchstart', startDrag);
    });
});
