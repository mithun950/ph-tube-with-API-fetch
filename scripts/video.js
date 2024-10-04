// display conditional time in card
function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = parseInt(time % 3600);
    const minutes = parseInt(remainingSecond/60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minutes} minutes ${remainingSecond} seconds ago`;
}

//1- fetch load and categories on html
//create load categories
const loadCategories = async() =>{
   //fetch the data
   
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(res => res.json())
   .then(data => displayCategories(data.categories))
   .catch((error) => console.log(error));

   };

//    create load videos 
const loadVideos = async() =>{
    //fetch the data
    
     fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch((error) => console.log(error));
 
    };
    //   click button on by on is come to display
    const loadCategoryVideos = (id) => {
        fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => displayVideos(data.category))
        .catch((error) => console.log(error));
     

    }

    // const demoObject =
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



    // display videos
    const displayVideos = (videos) => {
        const videosContainer = document.getElementById('videos')
        videosContainer.innerHTML = '';
        // jodi kono button e video na thake
        if(videos.length === 0){
            videosContainer.classList.remove('grid')
            videosContainer.innerHTML = `
             <div class="min-h-[500px] flex flex-col gap-5 justify-center items-center">
              <img src= "./assets/icon.png"/>
              <h class= "text-center text-2xl font-bold text-[red]">No Content Here Is This Category</h>
             </div>
            `; 
            return; 
        }
        else{
            videosContainer.classList.add('grid')
        }
       videos.forEach((video) =>{
        console.log(video)

        // create card for video
        const card = document.createElement('div');
        card.classList = 'card card-compact w-60 ';
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
    class="w-full h-full object-cover"

      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0? "" :`<span class='absolute right-2 bottom-2 bg-black rounded-md p-1 text-white text-xs'>${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-8 h-8 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    
    </div>
    <div>
    <h2 class=' font-bold'>
    ${video.title}
    </h2>
    <div class='flex items-center gap-3'>
     <p class= 'text-gray-400'> ${video.authors[0].profile_name} </p>
     ${video.authors[0].verified === true ? `<img class='h-3 w-3' src='https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png'/>` : " "}
    
    <p>
    
    </p>
    </div>
   
    </div>
    </div>
  </div>
        `;

        videosContainer.append(card)
       })
    }

   


// display categories
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories')
    categories.forEach((item) => {
        console.log(item)
// //  create a button 
 const buttonContainer = document.createElement('div');
 buttonContainer.innerHTML=`
 <button onclick="loadCategoryVideos(${item.category_id})" class="btn">
 ${item.category}
 </button>
 
 `;

//  add button category container 
categoryContainer.append(buttonContainer)
    });

};

loadCategories();
loadVideos();
