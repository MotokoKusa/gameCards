(() => {
  function createForm() {
    const container = document.getElementById('container');
    const spawnForm = document.createElement('form');
    const gameTitle = document.createElement('h2');
    const inpHor = document.createElement('input');
    const inpVer = document.createElement('input');
    const spawnBtn = document.createElement('button');
    const formObj = {
      hor: null,
      ver: null,
    };

    spawnBtn.textContent = 'Начать игру';

    spawnForm.classList.add('spawnForm');
    spawnForm.setAttribute('id', 'spawnForm');

    gameTitle.textContent = 'Игра в пары';
    inpHor.placeholder = 'Введите колличество карт по горизонтале';
    inpVer.placeholder = 'Введите колличество карт по вертикале';

    container.append(gameTitle);
    container.append(spawnForm);
    spawnForm.append(inpHor);
    spawnForm.append(inpVer);
    spawnForm.append(spawnBtn);
    return {
      spawnForm,
      inpHor,
      inpVer,
      spawnBtn,
      formObj,
    };
  }

  function createCard(obj, result, arr) {
    const container = document.getElementById('container');
    const card = document.createElement('div');
    const cards = document.getElementById('gameCard');
    const form = document.getElementById('spawnForm');
    const win = document.createElement('img');
    const btn = document.createElement('button');
    card.addEventListener('click', () => {
      if (!obj.vision) {
        obj.vision = !obj.vision;
        card.textContent = obj.num;
        if (result.length === 0 || result.length % 2 === 0 || result[result.length - 1] === obj.num) {
          result.push(obj.num);
        } else {
          alert('GAME OVER');
          result.length = 0;
          cards.remove();
        }
      }

      if (result.length === arr.length) {
        alert('YOU ARE WIN');
        result.length = 0;
        form.remove();
        btn.textContent = 'Сыграть еще';
        btn.style.margin = '10px 0 10px 0'
        btn.addEventListener('click', () => {
          const list = document.querySelectorAll('.gameCard > div');
          list.forEach((el) => {
            el.textContent = '';
          });
          arr.forEach((el) => {
            el.vision = false;
          });

          win.remove();
          btn.remove();
        });
        container.append(btn);
        win.src = 'https://st.depositphotos.com/1324256/2282/i/450/depositphotos_22829288-stock-photo-winner-silhouette-on-a-mount.jpg';
        container.append(win);
      }
    });
    return card;
  }

  function createGame(arr, result) {
    const container = document.getElementById('container');
    const gameCard = document.createElement('div');
    gameCard.classList.add('gameCard');
    gameCard.setAttribute('id', 'gameCard');
    container.append(gameCard);

    arr.forEach((el) => {
      gameCard.append(createCard(el, result, arr));
    });
  }

  function spawnGame() {
    const form = createForm();
    const cardsArray = [];
    const resultArray = [];
    form.spawnForm.addEventListener('submit', (el) => {
      el.preventDefault();
    });
    form.spawnBtn.addEventListener('click', () => {
      cardsArray.length = 0;
      const removeItem = document.getElementById('gameCard');
      if (removeItem) {
        removeItem.remove();
        cardsArray.length = 0;
      }

      if (form.inpVer.value % 2 === 0) {
        const counter = form.inpHor.value * form.inpVer.value;
        const shuffle = () => Math.random() - 0.5;
        for (let i = 0; cardsArray.length < counter; i++) {
          cardsArray.push({
            num: i + 1,
            vision: false,
          });
          cardsArray.push({
            num: i + 1,
            vision: false,
          });
        }
        cardsArray.sort(shuffle);
        form.inpVer.classList.remove('input-error');
      } else {
        form.inpVer.placeholder = 'Введите четное число';
        form.inpVer.classList.add('input-error');
      }

      createGame(cardsArray, resultArray);
      form.inpVer.value = null;
      form.inpHor.value = null;
    });
  }

  spawnGame();

})();

