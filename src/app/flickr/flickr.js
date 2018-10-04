import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function getImagesByTag(tag, page, pageSize) {
  return from(
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        process.env.FLICKR_API_KEY
      }&tags=${tag}&page=${page}&per_page=${pageSize}&format=json&nojsoncallback=1`
    )
  ).pipe(
    switchMap(response => response.json()),
    map(response => response.photos)
  );
}

export function getImageDetails(id) {
  return from(
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${
        process.env.FLICKR_API_KEY
      }&photo_id=${id}&format=json&nojsoncallback=1`
    )
  ).pipe(
    switchMap(response => response.json()),
    map(response => response.photo)
  );
}

export function getImagePath(image) {
  return `https://farm${image.farm}.staticflickr.com/${image.server}/${
    image.id
  }_${image.secret}.jpg`;
}
