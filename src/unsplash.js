import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';


export default function ChangeImage(props) {

  const unsplash = createApi({
    accessKey: "Vo_E9LCr3ED3sQw28VBO0y_FK9Zbaxz2erl1oV_WisY"
  });

  const [figure, setImage] = useState(null)

  function grabImage(response) {
    const data = response.response.results
    const randomData = data[Math.floor(Math.random())]
    const image = randomData.urls.regular
    setImage(image)
  }

  useEffect(() => {
    unsplash.search.getPhotos({
      query: props.image,
      page: 1,
      perPage: 10,
      orientation: 'portrait',
    }).then(grabImage)
      .catch(error => console.log(error))
  })

  return (<
    img src={figure} alt='' />
  )
}
