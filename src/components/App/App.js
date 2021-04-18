import React, { useState, useEffect } from 'react';
import SearchBar from '../Searchbar/Searchbar';
import s from '../App/App.module.css';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import * as API from '../../services/apiImg';


export default function App () {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [seachQuery, setSeachQuery] = useState('');
      

  useEffect(() => {
    if (!seachQuery) {
    return;
    }

    const fetchImg = (seachQuery) => {
    setIsLoading(true);

    API.getImages(seachQuery, currentPage)
      .then(responseData => {
        setImages(prevImg => [...prevImg, ...responseData.data.hits]);
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    })
      .catch(error => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  };

  fetchImg(seachQuery);
}, [currentPage, seachQuery]);


  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const  onChangeQuery = seachQuery => {
    setSeachQuery(seachQuery);
    setIsLoading(true);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  
    };
  

  const shouldRenderLoadMoreButton = images.length > 11 && !isLoading;

  return (
    <div className={s.container}>
      <SearchBar onSubmit={onChangeQuery} />
      {images.length >= 1 && !isLoading && <ImageGallery images={images} />}
      {error && <h1>No image found</h1>}
      {isLoading && <Loader />}
      {shouldRenderLoadMoreButton && (<Button onClick={updatePage} />)}
    </div>
  );
} 






// Without hooks

// import React, { Component } from 'react';
// import SearchBar from '../Searchbar/Searchbar';
// import s from '../App/App.module.css';
// import Button from '../Button/Button';
// import ImageGallery from '../ImageGallery/ImageGallery';
// import Loader from '../Loader/Loader';
// import * as API from '../../services/apiImg';


// class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     error: false,
//     currentPage: 1,
//     seachQuery: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { seachQuery, currentPage } = this.state;
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       this.fetchImg(seachQuery, currentPage);
//     }
//   }

//   onChangeQuery = seachQuery => {
//     this.setState({ seachQuery, isLoading: true });
//     API.getImages(seachQuery)
//       .then(responseData => {
//         this.setState({ images: responseData.data.hits });
//       })
//       .catch(error => {
//         throw new Error(error);
//       })
//       .finally(() => {
//         if (this.state.images.length >= 1) {
//           this.setState({ error: false });
//         } else {
//           this.setState({ error: true });
//         }
//         this.setState({ isLoading: false });
//       });
//   };
//   fetchImg = () => {
//     const { seachQuery, currentPage } = this.state;
//     API.getImages(seachQuery, currentPage + 1)
//       .then(responseData => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...responseData.data.hits],
//           currentPage: prevState.currentPage + 1,
//         }));
//           if (currentPage >= 1) {
//               window.scrollTo({
//                   top: document.documentElement.scrollHeight,
//                   behavior: 'smooth',
//               });
//           }
//       })
//       .catch(error => this.setState({ error: true }))
//       .finally(() => this.setState({ isLoading: false }));
//   };
//   render() {
//     const { images, isLoading, error } = this.state;
//     const shouldRenderLoadMoreButton = images.length > 11 && !isLoading;
//     return (
//       <div className={s.container}>
//         <SearchBar onSubmit={this.onChangeQuery} />
//         {error && <h1>No image found</h1>}
//         {isLoading && <Loader />}
//         {!isLoading && <ImageGallery images={images} />}
//         {shouldRenderLoadMoreButton && <Button onClick={this.fetchImg} />}
//       </div>
//     );
//   }
// }
// export default App;
 


