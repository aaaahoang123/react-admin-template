import {message} from 'antd';

function copyToClipBoard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    // textArea.style.display = 'none';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        successful
            ? message.info('Đã copy vào clipboard thành công')
            : message.warning('Copy vào clipboard thất bại');
    } catch (err) {
         message.warning('Lỗi khi copy vào clipboard');
         console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
export default copyToClipBoard;
