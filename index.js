// ADD STUDENT
const button = document.querySelector('#more');
const student = document.querySelector('.student');
const subBy = document.querySelector('.submitted-by-form');

let count = 1;
const maxCount = 6;

button.addEventListener('click', () => {
    if (count < maxCount) {
        const clone = student.cloneNode(true);
        subBy.appendChild(clone);
        count++;
        clone.id = `student${count}`;
    }
    if (count === maxCount) {
        button.disabled = true;
        button.textContent = "Limit reached";
    }
});


// UPDATE PAPER
const reportSelect = document.getElementById("report");
const titleArea = document.querySelector(".report-on span:nth-child(2)");
const container1 = document.querySelector(".container-1");
const container2 = document.querySelector(".container-2");

reportSelect.addEventListener("change", () => {
    titleArea.textContent = reportSelect.value;
});

function updatePaper() {
    const nameInputs = document.querySelectorAll(".name");
    const regdInputs = document.querySelectorAll(".regd-no");

    container1.innerHTML = "";
    container2.innerHTML = "";

    nameInputs.forEach(input => {
        const p = document.createElement("p");
        p.textContent = input.value.trim();
        container1.appendChild(p);
    });

    regdInputs.forEach(input => {
        const p = document.createElement("p");
        p.textContent = input.value.trim();
        container2.appendChild(p);
    });
}

document.addEventListener("input", (e) => {
    if(e.target.classList.contains("name") || e.target.classList.contains("regd-no")) {
        updatePaper();
    }
});

// DOWNLOAD BUTTON - TOOK HELP OF AI IN THIS SECTION
const downloadBtn = document.getElementById("Download");

downloadBtn.addEventListener("click", async () => {
    const paper = document.querySelector(".paper");

    const canvas = await html2canvas(paper, {
        scale: 3,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });


    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const imgScaledWidth = imgWidth * ratio;
    const imgScaledHeight = imgHeight * ratio;

    const x = (pageWidth - imgScaledWidth) / 2;
    const y = (pageHeight - imgScaledHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgScaledWidth, imgScaledHeight);
    pdf.save("Front_Page.pdf");
});
