namespace Picture.db;

entity Pictures {
  key ID : UUID;
  @Core.MediaType: mediaType
  content : LargeBinary;
  @Core.IsMediaType: true
  mediaType : String;
  filename : String;
}
