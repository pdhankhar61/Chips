const ul = document.querySelector("ul"), input = ul.querySelector("input");
const buttonRemoveAll = document.querySelector("#removeAll");
buttonRemoveAll.style.cursor = "not-allowed";
input.addEventListener("keyup", addTag); input.focus();
let remainingTags = document.querySelector(".details p span");
count = Number(remainingTags.innerText);

let tags = [];


function closeIcon(tag) {
    return `<ion-icon name="close-circle-outline" onclick="remove(this,'${tag}')"></ion-icon>`;
}

for (let i = 0; i < ul.children.length - 1; i++) {
    tags.push(ul.children[i].innerHTML.split('<')[0]);
}

function remove(element, tag) {
    let index = tags.indexOf(tag);
    if (index < 1) {
        buttonRemoveAll.style.cursor = 'not-allowed';
    }
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    count++;
    remainingTags.innerText = count;
}

function removeAll() {
    for (let i = ul.childElementCount - 2; i >= 0; i--) {
        (ul.children[i].remove());
        count++;
        remainingTags.innerText = count;
    }
    tags = [];
    buttonRemoveAll.style.cursor = 'not-allowed';
}

function addTag(e) {
    if (tags.length <= 9) {
        if (e.key == ',' || e.key == 'Enter') {
            const tag = e.target.value.replace(/\s+/g, ' ');

            if (tag.length > 1) {
                const tagArray = tag.split(',');
                tagArray.forEach(element => {
                    element = element.trim();
                    if (element.length > 1 && !tags.includes(element)) {
                        tags.push(element);
                        const li = document.createElement("li");
                        li.innerHTML = element + closeIcon(element);
                        ul.children[ul.children.length - 1].remove();
                        input.removeEventListener('keyup', addTag);
                        ul.append(li);
                        count--;
                        if (8 < count < 10) {
                            buttonRemoveAll.style.cursor = 'pointer';
                        }
                        remainingTags.innerText = count;
                        if (tags.length <= 10) {
                            const inputE = document.createElement('input');
                            inputE.type = "text";
                            inputE.addEventListener('keyup', addTag);
                            ul.append(inputE);
                            ul.querySelector("input").focus();
                        }
                    }
                });
            }
        }
    }
}

