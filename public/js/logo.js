// JS for the cat logo animation
document.addEventListener('DOMContentLoaded', function() {
    var logoLink = document.getElementById('logoLink');
    var logoImage = document.getElementById('logoImage');
    var originalSrc = logoImage.src;
    var newSrc = './images/catstandlogo.png';  // Image Ref: https://cdn.vectorstock.com/i/1000x1000/01/76/cute-kitten-domestic-pet-pixel-art-isolated-vector-12320176.jpg

    logoLink.addEventListener('mouseenter', function() {
      logoImage.src = newSrc;
    });

    logoLink.addEventListener('mouseleave', function() {
      logoImage.src = originalSrc;
    });
  });