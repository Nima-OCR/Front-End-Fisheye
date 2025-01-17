/**
 * Fonction factory pour créer des objets média
 * @param {Object} data - Un objet contenant des données de média (id, photographerId, title, image, video, likes)
 * @returns {Object} Un objet contenant les données de média et une fonction pour créer et renvoyer les éléments DOM du média
 */
// Fonction qui génère un objet avec ses informations et un élément DOM pour l'afficher
export function mediaFactory(data) {

  const { id, photographerId, title, image, video, likes, date } = data;
  const imagePath = `./assets/images/${photographerId}/${image}`;
  const videoPath = `./assets/images/${photographerId}/${video}`;


  /**
   Fonction qui crée et renvoie les éléments du DOM pour afficher les médias
   @function getMediCardDOM
   @returns {HTMLElement} Un élément DOM 'article' contenant les informations et les médias.
   */

  function getMediCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('class', 'portfolio');

    const figure = document.createElement('figure');
    article.appendChild(figure);

    // Pour l'image
    if (image) {
      const img = document.createElement('img');
      img.classList.add('showLightBox');
      img.setAttribute('src', imagePath);
      img.setAttribute('alt', `Image ${title}`);
      img.setAttribute('aria-label', "Ouverture de la lightbox")
      img.setAttribute('data-id', id);
      img.setAttribute('tabindex', '0');
      figure.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('showLightBox');
      videoElement.setAttribute('src', videoPath);
      // videoElement.setAttribute('alt', `Vidéo de ${title}`);
      videoElement.setAttribute('aria-label', "Ouverture de la lightbox")
      videoElement.setAttribute('controls', "");
      videoElement.setAttribute('data-id', id);
      videoElement.setAttribute('tabindex', '0');
      figure.appendChild(videoElement);
    }



    const figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = title;
    figcaption.appendChild(titleElement);

    const likesElement = document.createElement('p');
    likesElement.innerHTML = `${likes} `;
    figcaption.appendChild(likesElement);

    function createHeartIcon(className) {
      const heartIcon = document.createElement('em');
      heartIcon.className = className;
      heartIcon.setAttribute('tabindex', '0');
      return heartIcon;
    }

    function createHeartContainer(heartIcon, solidHeartIcon) {
      const heartContainer = document.createElement('span');
      heartContainer.className = 'heart-container';
      heartContainer.appendChild(solidHeartIcon);
      heartContainer.appendChild(heartIcon);
      return heartContainer;
    }

    function handleHeartClick(event) {
      const heartContainer = event.target.parentNode;
      // const heartIcon = heartContainer.querySelector('.fa-regular.fa-heart');
      const solidHeartIcon = heartContainer.querySelector('.fas.fa-heart');
      const likesElement = heartContainer.parentNode;
      const likeCount = parseInt(likesElement.textContent);

      let updatedLikeCount;

      if (solidHeartIcon.style.display === 'none') {
        updatedLikeCount = likeCount + 1;
        solidHeartIcon.style.display = 'inline';
      } else {
        updatedLikeCount = likeCount - 1;
        solidHeartIcon.style.display = 'none';
      }

      likesElement.textContent = `${updatedLikeCount} `;
      likesElement.appendChild(heartContainer);

      // Récupérez l'élément affichant le total des likes
      const totalLikesElement = document.querySelector('.total-likes');
      let currentTotalLikes = parseInt(totalLikesElement.textContent);

      // Incrémente ou décrémente le total des likes
      if (solidHeartIcon.style.display === 'inline') {
        currentTotalLikes += 1;
        solidHeartIcon.setAttribute('aria-label', 'likes');
      } else {
        currentTotalLikes -= 1;
        solidHeartIcon.removeAttribute('aria-label');
        solidHeartIcon.setAttribute('alt', 'likes');
      }

      totalLikesElement.textContent = currentTotalLikes.toString();
    }

    function attachHeartIconEvent(heartIcon) {
      heartIcon.addEventListener('click', handleHeartClick);
      heartIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleHeartClick(event);
          heartIcon.focus();
        }
      });
    }



    function toggleHeartFillOnEvent(heartIcons) {
      heartIcons.forEach((heart) => {
        heart.addEventListener('click', () => {
          heart.classList.toggle('filled');
        });
        heart.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            heart.classList.toggle('filled');
          }
        });
      });
    }



// Code principal
    const heartIcon = createHeartIcon('fa-regular fa-heart');
    const solidHeartIcon = createHeartIcon('fas fa-heart');
    solidHeartIcon.style.display = 'none';

    const heartContainer = createHeartContainer(heartIcon, solidHeartIcon);

    likesElement.appendChild(heartContainer);

    attachHeartIconEvent(heartIcon);

    const heartIcons = document.querySelectorAll('.heart-icon');

    toggleHeartFillOnEvent(heartIcons);

    return article;
  }

  return { id, photographerId, title, image, video, likes, date, getMediCardDOM };
}
