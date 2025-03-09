// Inisialisasi AOS
AOS.init({
    duration: 600, 
    easing: 'ease-out', 
    once: false, 
    mirror: true, });

// Event
document.getElementById("tryFreeBtn").addEventListener("click", function () {
    window.location.href = "trial.html";
});

document.getElementById("tryNowBtn").addEventListener("click", function () {
    window.location.href = "main.html";
});
// 
