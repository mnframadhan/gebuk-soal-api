# API Specs

# Public API
## Register Contributor
Endpoint: POST /api/contributor

Request Body:
```json
{
    "username": "fitrahramadhan",
    "email": "fitrahramadhan@fitrahramadhan",
    "password": "rahasia123"
}
```

Response Body:
```json
{
    "id": "uuid",
    "username": "fitrahramadhan",
    "email": "fitrahramadhan@fitrahramadhan",
    "created_at": "7123131321312",
    "contribution_points": 0,
    "number_of_soal" : 0,
    "token" : "another-uuid"
}
```

## Login Contributor
Endpoint: POST /api/contributor/login

Request Body:
```json
{
    "username": "fitrahramadhan",
    "password": "rahasia123"
}
```

Response Body:
```json
{
    "id": "uuid",
    "username": "fitrahramadhan",
    "email": "fitrahramadhan@fitrahramadhan",
    "created_at": "7123131321312",
    "contribution_points": 0,
    "number_of_soal" : 0,
    "token" : "another-uuid"
}
```


# Private API
Request Headers: X-API-TOKEN

## Show Current Contributor
Endpoint: GET /api/contributor/

Response Body:
```json
{
    "id": "uuid",
    "username": "fitrahramadhan",
    "email": "fitrahramadhan@fitrahramadhan",
    "created_at": "17123131321312",
    "contribution_points": 0,
    "number_of_soal" : 0,
    "token" : "another-uuid"
}
```

## Show Contributors Leaderboard
Endpoint: GET /api/contributor/?page=?&limit=?

Response Body:
```json
 {
    "data":[
       
            {
                "username":"user8.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user7.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user5.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user0.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"contributor.test",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user1.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user2.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user9.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user11.contributor",
                "contribution_points":0,
                "number_of_soal":0
            },
            {
                "username":"user3.contributor",
                "contribution_points":0,
                "number_of_soal":0
            }
        ],
    
    "pagination":{
        "size":10,
        "total_page":2,
        "current_page":1
        }
    }
```