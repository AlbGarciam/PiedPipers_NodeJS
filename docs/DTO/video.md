# Contact

This DTO represents a contact method on the server. It has the following values

- **type**: _String_ (_Mandatory_) Contact method, its possible values are (_email_ or _phone_)
- **data**: _String_ (_Mandatory_) Contact data

- **id** _String_ (_Mandatory_) Video's video
- **video** _String_ (_Mandatory_) Video's original url
- **embedVideo** _String_ (_Mandatory_) Video's embed url
- **thumbnail** _String_ (_Mandatory_) Video's thumbnail

## Example

```javascript
{
    "id": "41DH065Lfeo",
    "video": "https://www.youtube.com/watch?v=41DH065Lfeo",
    "embedVideo": "https://www.youtube.com/embed/41DH065Lfeo?ecver=1&amp;iv_load_policy=1&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;",
    "thumbnail": "https://img.youtube.com/vi/41DH065Lfeo/hqdefault.jpg"
}
```
