console.log("Video JS Connected")

function getTimeString (time){
    const hour = parseInt(time/3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond/60);
    remainingSecond = remainingSecond % 60;
    return `${hour} h ${minute} m ${remainingSecond} second ago`
}

// fetch data from API

const loadCatagoriesData = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
        .catch(error => console.log(error))
}

// fetch video data from API

const loadVideosData = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

const displayCategory = (category) => {
    const categoryContainer = document.getElementById("button-container")
    category.forEach(item => {
        const button = document.createElement("button")
        button.classList = "btn";
        button.innerText = item.category;
        categoryContainer.append(button);
    });
}

// Display videos from API Get Data

const displayVideos = (videos) => {
    console.log(videos)
    const videoContainer = document.getElementById("videos-container")
    videos.forEach(video => {
        const videoTag = document.createElement("div")
        videoTag.classList = "card card-compact";
        videoTag.innerHTML = `
    <figure class ="h-[250px] relative">
    <img src="${video.thumbnail}" class = "h-full w-full object-cover"
      alt="${video.title}" />
    ${video.others.posted_date?.length == 0 ? "": `<span class="absolute right-2 bottom-2 bg-black text-white px-3 py-1 rounded ">
        ${getTimeString(video.others.posted_date)}</span>`}
    </figure>
  <div class="flex gap-2 my-3 items-center">
    <div class="w-10 h-10">
    <img class=" rounded-full object-cover w-full h-full" src="${video.authors[0].profile_picture}"/>
    </div>
    <div class="px-0 py-2">
    <h2 class="font-bold">${video.title}</h2>

    <div class ="flex gap-2 items-center">
    <p>${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />`: ""}
    </div>

    </div>

    </div>
  
        `
        videoContainer.append(videoTag);
    })
}

loadCatagoriesData();
loadVideosData();