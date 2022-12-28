import axios from "axios";
export async function fetchPictures (search, pageNum) {
    try {
      const {data: {hits}} = await axios.get(`https://pixabay.com/api/?q=${search}&page=${pageNum}&key=31432511-b7965565b9f0f737e4e31f534&image_type=photo&orientation=horizontal&per_page=12`);
      
      return hits;
    } catch (error) {
     return   error.message;
    }

}

