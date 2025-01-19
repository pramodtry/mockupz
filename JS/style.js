
document.addEventListener("DOMContentLoaded", () => {
    const imageBlocks = document.querySelectorAll(".image-block");

    imageBlocks.forEach(block => {
        block.addEventListener("click", () => {
            imageBlocks.forEach(b => b.classList.remove("selected"));
            block.classList.add("selected");
        });
    });
});

// Highlight selected image
const style = document.createElement("style");
style.innerHTML = `.selected { border: 3px solid #ff5722; }`;
document.head.appendChild(style);

let colors;
        let defaultColor = "#0000ff";
        window.addEventListener("load", startup, false);
        function startup() {
            colors = document.querySelector("#colors");
            colors.value = defaultColor;
            colors.addEventListener("input", updateAll, false);
            colors.addEventListener("change", updateAll, false);
            colors.select();
        }
        function updateFirst(event) {
            let p = document.querySelector("p");
            let img = document.querySelector("img");
            if (p) {
                p.style.color = event.target.value;
            }
            if (img) {
                img.style.backgroundColor = event.target.value;
            }
        }
        function updateAll(event) {
            document.querySelectorAll("p").forEach(function (p) {
                p.style.color = event.target.value;
            });
            document.querySelectorAll("img").forEach(function (img) {
                img.style.backgroundColor = event.target.value;
            });
        }

	   const downloadBtn = document.querySelector('.download-btn');

		  downloadBtn.addEventListener('click', () => {
			const img = document.querySelector('img');
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const bgColor = window.getComputedStyle(img).backgroundColor;

			// Set canvas dimensions
			const imgWidth = img.naturalWidth || img.width;
			const imgHeight = img.naturalHeight || img.height;
			canvas.width = imgWidth;
			canvas.height = imgHeight;

			// Draw the background color
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw the image
			const imgElement = new Image();
			imgElement.crossOrigin = 'anonymous'; // To avoid CORS issues
			imgElement.src = img.src;
			imgElement.onload = () => {
			  ctx.drawImage(imgElement, 0, 0, imgWidth, imgHeight);

			  // Create a download link
			  const link = document.createElement('a');
			  link.download = 'image-with-background.png';
			  link.href = canvas.toDataURL();
			  link.click();
			};
		  });