const profileEditPopup = document.querySelector(".popup_profile");
const addCardPopup = document.querySelector(".popup_add-card");
const imagePopup = document.querySelector(".popup__type_image");
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const formProfileElement = profileEditPopup.querySelector('.profile-edit');
const nameInput = formProfileElement.querySelector('#name');
const jobInput = formProfileElement.querySelector('#job');
const cardTemplate = document.querySelector("#preset-card").content;
const cards = document.querySelector(".cards");

function openPopupContainer(popup) {
    popup.classList.add("popup_opened");
}

function closePopupContainer(popup) {
    popup.classList.remove("popup_opened");
}

document.querySelector('.profile__edit').addEventListener('click', () => {
    openPopupContainer(profileEditPopup);
});

profileEditPopup.querySelector('.popup__close').addEventListener('click', () => {
    closePopupContainer(profileEditPopup);
});


function editForm(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;

    closePopupContainer(profileEditPopup);
}

formProfileElement.addEventListener('submit', editForm);

function createTemplateCard(data) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__title").textContent = data.cardName;
    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = data.cardLink;
    cardImage.alt = data.cardName;

    cardElement
        .querySelector(".card__heart")
        .addEventListener("click", (event) => {
            event.target.classList.toggle("card__heart_active");
        });

    cardElement
        .querySelector(".card__delete")
        .addEventListener("click", () => {
            cardElement.remove();
        });

    cardElement.querySelector(".card__image").addEventListener("click", () => {
        const popupImage = imagePopup.querySelector(".view-card__image");
        popupImage.src = data.cardLink;
        popupImage.alt = data.cardName;
        const popupCaption = imagePopup.querySelector(".view-card__caption");
        popupCaption.textContent = data.cardName;

        openPopupContainer(imagePopup);
    });

    return cardElement;
}

function addCardToEnd(data) {
    const newCard = createTemplateCard(data);
    cards.append(newCard);
}

function addCardToStart(data) {
    const newCard = createTemplateCard(data);
    cards.prepend(newCard);
}

const presetCards = [
    {
        name: "Лондон",
        link: "https://images.pexels.com/photos/507410/pexels-photo-507410.jpeg",
    },
    {
        name: "Мадрид",
        link: "https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg",
    },
    {
        name: "Светлогорск",
        link: "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg",
    },
    {
        name: "Германия",
        link: "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg",
    },
    {
        name: "Перу",
        link: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
    },
    {
        name: "Вашингтон",
        link: "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg",
    },
];

presetCards.forEach((card) => {
    addCardToEnd({
        cardName: card.name,
        cardLink: card.link,
    });
});

document.querySelector(".profile__add").addEventListener("click", () => {
    openPopupContainer(addCardPopup);
});

addCardPopup
    .querySelector(".popup__close")
    .addEventListener("click", () => {
        closePopupContainer(addCardPopup);
    });

const newCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__card-title");
const cardSrcInput = newCardForm.querySelector(".popup__card-src");

function addCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameInputValue = cardNameInput.value;
    const cardSrcInputValue = cardSrcInput.value;

    addCardToStart({
        cardName: cardNameInputValue,
        cardLink: cardSrcInputValue,
    });


    closePopupContainer(addCardPopup);


    newCardForm.reset();
}


newCardForm.addEventListener("submit", addCardFormSubmit);


imagePopup
    .querySelector(".popup__close")
    .addEventListener("click", () => {
        closePopupContainer(imagePopup);
    });

