
const inputValue = document.getElementById("search-input");
const searchBtn = document.getElementById("search");

const profileImage = document.getElementById("profile-image");

console.log(inputValue);
console.log(searchBtn);



inputValue.addEventListener("change", () => {
    try {
        searchProfile();
        

    } catch (error) {
        console.log(error.message)
    }
    
})

searchBtn.addEventListener('click', () => {
    console.log(inputValue.value = "")
})

async function searchProfile() {
    let githubLink = `https://api.github.com/users/${inputValue.value}`;
    const response = await fetch(githubLink);
    const data = await response.json();
    console.log(data)
    profileImage.setAttribute("src", data.avatar_url);
}