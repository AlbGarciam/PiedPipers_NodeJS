# Contact

This DTO represents a contact method on the server. It has the following values

- **type**: _String_ (_Mandatory_) Contact method, its possible values are (_email_ or _phone_)
- **data**: _String_ (_Mandatory_) Contact data

## Example

```javascript
{
    "type": "email",
    "data": "test_user@gmail.com"
}
```
