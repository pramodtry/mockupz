
document.addEventListener("DOMContentLoaded", () => {
	const imageBlocks = document.querySelectorAll(".image-block");

	imageBlocks.forEach(block => {
		block.addEventListener("click", () => {
			imageBlocks.forEach(b => b.classList.remove("selected"));
			block.classList.add("selected");
		});
	});
});
/* const downloadBtn = document.querySelector('.download-btn');

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
	  //   canvas.toBlob(function(blob){
	  //     link.href = URL.createObjectURL(blob);
	  //     console.log(blob);
	  //   },'image/png');
		link.click();
	  };
	});

   */
  const downloadBtn = document.querySelector('.download-btn');

  downloadBtn.addEventListener('click', async () => {
	  const img = document.getElementById('fileInput');
	  if (!img) {
		  console.error('Image not found!');
		  return;
	  }
	  
	  const canvas = document.createElement('canvas');
	  const ctx = canvas.getContext('2d');
	  
	  // Get computed background color of the image
	  let bgColor = window.getComputedStyle(img).backgroundColor;
	  if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)') {
		  bgColor = '#ffffff';  // Default to white background
	  }

	  // Set canvas dimensions based on the image
	  const imgWidth = img.naturalWidth || img.width;
	  const imgHeight = img.naturalHeight || img.height;
	  canvas.width = imgWidth;
	  canvas.height = imgHeight;

	  // Fill canvas with background color
	  ctx.fillStyle = bgColor;
	  ctx.fillRect(0, 0, canvas.width, canvas.height);

	  // Load the PNG/JPG image
	  const imgElement = await loadImage(img.src);
	  
	  // Load the SVG content
	  const svgElement = document.getElementById('svgreImage');
	  const svgData = new XMLSerializer().serializeToString(svgElement);
	  const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
	  const svgUrl = URL.createObjectURL(svgBlob);
	  const svgImage = await loadImage(svgUrl);

	  alert(svgElement);
	 
	  // Draw images onto canvas
	  ctx.drawImage(imgElement, 0, 0, imgWidth, imgHeight);
	  ctx.drawImage(svgImage, 50, 50, imgWidth * 0.5, imgHeight * 0.5); // Adjust position/size

	  // Create download link
	  canvas.toBlob((blob) => {
		  const link = document.createElement('a');
		  link.download = 'merged-image.png';
		  link.href = URL.createObjectURL(blob);
		  link.click();
		  URL.revokeObjectURL(link.href);  // Cleanup memory
	  }, 'image/png');

	  // Cleanup blob URLs
	  URL.revokeObjectURL(svgUrl);
  });

  // Function to load an image asynchronously
  function loadImage(src) {
	  return new Promise((resolve, reject) => {
		  const img = new Image();
		  img.crossOrigin = 'anonymous';  // Handle CORS issues
		  img.onload = () => resolve(img);
		  img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
		  img.src = src;
	  });
  }

  /*Color Change on click slider*/
  $(document).ready(function () {
    let defaultColor = "#0000ff";
    let $colors = $("#colors");

    $colors.val(defaultColor);
    $colors.on("input change", updateAll);
    $colors.select();

    function updateFirst(event) {
        let $p = $("p").first();
        let $img = $("img").first();
        if ($p.length) {
            $p.css("color", event.target.value);
        }
        if ($img.length) {
            $img.css("background-color", event.target.value);
        }
    }

    function updateAll(event) {
       // $("p").css("color", event.target.value);
		$("img").css("background-color", event.target.value);
		$("svg path").attr("fill", event.target.value);
    }
});