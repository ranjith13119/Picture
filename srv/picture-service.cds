using {Picture.db as db} from '../db/schema';

service Picture_service {
    entity PictureSet as projection on db.Pictures;  
    // entity PictureSett as projection on db.Pictures;  
}