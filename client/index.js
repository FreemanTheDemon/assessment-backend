let baseUrl = 'http://localhost:4000'

document.getElementById("complimentButton").onclick = function () {
    axios.get(baseUrl + "/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

const fortuneBtn = document.getElementById('fortuneButton');
fortuneBtn.onclick = () => {
    axios.get(baseUrl + '/api/fortune/')
        .then((res) => {
            alert(res.data);
        })
}

const goodBtn = document.getElementById('goodButton');
const goodInput = document.getElementById('goodThings');
const goodList = document.getElementById('goodList');

goodBtn.onclick = () => {
    let body = {
        good: goodInput.value
    }
    axios.post(baseUrl + '/api/good/', body)
        .then((res) => {
            let element = document.createElement('li');
            element.textContent = res.data.good;
            element.classList.add(res.data.id + '');
            element.addEventListener('click', removeListItem);
            goodList.appendChild(element);
        })
    goodInput.value = '';
}

const allGoodThings = document.getElementById('allGoodThings')
let allLi = document.getElementsByTagName('li');
let clicked = false;

const clickAddGood = () => {
    if (clicked) {
        clicked = false;
        allGoodThings.textContent = 'Add the whole good database to the list';
        while (allLi[0]) {
            allLi[0].parentNode.removeChild(allLi[0]);
        }
    } else {
        clicked = true;
        allGoodThings.textContent = 'Remove all in the list';
        axios.get(baseUrl + '/api/good/')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    let element = document.createElement('li');
                    element.textContent = res.data[i].good;
                    element.classList.add(res.data[i].id + '');
                    element.addEventListener('click', removeListItem);
                    goodList.appendChild(element);
                }
            })
    }
}

allGoodThings.addEventListener('click', clickAddGood);

const removeListItem = (e) => {
    let id = e.target.classList[0];
    console.log(id);
    axios.delete(baseUrl + '/api/good/' + id, {data: {id: id}})
        .then((res) => {
            let toBeDeleted = document.getElementsByClassName(e.target.classList[0]);
            while (toBeDeleted[0]) {
                toBeDeleted[0].parentNode.removeChild(toBeDeleted[0]);
            }
            // e.target.parentNode.removeChild(e.target);
        })

}

const ruinBtn = document.getElementById('ruinTheDatabase');
const ruinInput = document.getElementById('databaseRuined');

const ruinTheDatabase = () => {
    axios.put(baseUrl + '/api/good/', {replace: ruinInput.value})
        .then((res) => {
            clicked = true;
            clickAddGood();
            clickAddGood();
            ruinInput.value = '';
        })
}

ruinBtn.addEventListener('click', ruinTheDatabase);