
const inputValue = document.getElementById("search-input");
const searchBtn = document.getElementById("search");

const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const userName = document.getElementById("handle");
const dateJoined = document.getElementById("join-date");
const bio = document.querySelector(".card-text");
const repo = document.getElementById("repo");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const locations = document.getElementById("locations");
const blog = document.getElementById("blog");
const twitterHandle = document.getElementById("twitterHandle");
const organisation = document.getElementById("organisation");
const offline = document.querySelector(".offline");
const organisationContainer = document.querySelector(".organisation");


let fullDate = new Date(dateJoined);

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];



console.log(fullDate);
console.log(fullDate.getFullYear())
console.log(fullDate.getDate());
console.log(`Joined ${fullDate.getDate()} ${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`);

console.log(inputValue);
console.log(twitterHandle.innerText);




inputValue.addEventListener("change", () => {
    try {
        searchProfile();
        // inputValue.addEventListener("click", () => {
        //     window.location.reload();
        // })
        
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
    profileName.innerHTML = data.name;
    userName.innerHTML = `@${data.login}`;

    const fullDate = new Date(data.created_at)
    dateJoined.innerHTML = `Joined ${fullDate.getDate()} ${
      months[fullDate.getMonth()]
    } ${fullDate.getFullYear()}`;

    bio.innerHTML = data.bio;
    repo.innerHTML = data.public_repos;
    followers.innerHTML = data.followers;
    following.innerHTML = data.following;
    locations.innerHTML = data.location;
    if (data.company){
        organisation.innerHTML = `@${data.company}` 
        organisation.classList.remove("offline");
    }else{
        organisationContainer.classList.add("offline");
         organisation.innerHTML = "Not Available";
    }

    if(data.twitter_username !== null){
        offline.classList.remove("offline")
        twitterHandle.innerHTML = `@${data.twitter_username}`;
        twitterHandle.setAttribute("href", `https://twitter.com/${data.twitter_username}`);
        twitterHandle.style.color = "white";
    }else{
        // offline.classList.add("offline");
        twitterHandle.style.color = "#798094";
        twitterHandle.innerHTML = "Not Available";
    }

    // twitterHandle.innerHTML = data.twitter_username !== null
    //   ? offline.classList.remove("offline")
    //     ? data.twitter_username !== null
    //     : `@${data.twitter_username}`
    //   : "Not Available";
      if(data.blog.length){
        blog.innerHTML = data.blog
        blog.setAttribute("href", data.blog);
        blog.style.color = 'white'
      }else{
        blog.innerText = "Not Available";
        blog.setAttribute("href", "#");
      }
   
}