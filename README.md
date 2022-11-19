<div align="center">
  <img src="https://user-images.githubusercontent.com/116631225/202865350-c07ac250-f73c-47b1-a54a-283266c515e5.png" width="100" alt="KomikIndo Logo">
  <h3><strong>KomikIndo RESTful API</strong></h3>
  <a href="fuainaru-komikindo-api" target="_blank">API URL</a>
</div>

## Prerequisite
Make sure you have installed all of the following prerequisites:
- [Deno](https://deno.land/) - A modern runtime for JavaScript and TypeScript.

## Installation and Run Application
1. Clone the repository
```bash
git clone https://github.com/fuainaru/komikindo-api.git
cd komikindo-api/
```
2. Run the application
```bash
deno run --allow-net app.ts
```

## Features
- Home Page
  - [x] Popular the day comics
  - [x] New comics
- Chapter Comic
- Details Chapter Comic

## API Documentation
### Home Page
#### Endpoint
```http
GET /manga/home
```
#### Response
```json
{
    "data": {
        "popular_the_day": [
            {
                "title": "Bleach",
                "chapter": "687.2",
                "date": "1 tahun lalu",
                "url": "komik/bleach/",
                "image": "https://cdn.kena-blok.xyz/uploads/2020/12/Komik-Bleach.jpg"
            },
        ],
        "new_comics": [
            {
                "title": "Momoiro Ome-chen",
                "chapter": "1",
                "url": "komik/momoiro-ome-chen/",
                "image": "https://cdn.kena-blok.xyz/uploads/2022/11/Komik-Momoiro-Ome-chen.png"
            },
        ]
    }
}
```
### Details Chapter Comic
#### Endpoint
```http
POST /manga/chapters
```
#### Payload
| Parameter | Type | Description | Example
| :--- | :--- | :--- | :--- |
| `url` | `string` | Comic chapter url | `kage-no-jitsuryokusha-ni-naritakute`
#### Response
```json
{
    "data": {
        "chapter_details": {
            "title": "The Eminence in Shadow, To Be a Power in the Shadows!, Восхождение в тени, 陰の実力者になりたくて！, 숨은 실력자가 되고싶어서",
            "status": "Berjalan",
            "author": "Aizawa Daisuke",
            "illustrator": "Sakano Anri",
            "graphic": "Shounen",
            "genre": ["Demons"],
            "type": "Manga",
            "reader": "1.3 jt orang"
        },
        "synopsis": "Manga Kage no Jitsuryokusha ni Naritakute yang dibuat oleh komikus bernama Aizawa Daisuke ini bercerita tentang Sama seperti bagaimana semua orang memuja pahlawan di masa kecil mereka, seorang pria muda memuja kekuatan yang tersembunyi dalam bayang-bayang. Ninja, bajingan, tipe mentor bayangan, kesepakatan semacam itu.\nSetelah menyembunyikan kekuatannya dan menjalani kehidupan NPC yang biasa-biasa saja di siang hari sambil menjalani pelatihan hiruk pikuk di malam hari, dia akhirnya bereinkarnasi ke dunia yang berbeda dan mendapatkan kekuatan tertinggi.\nPemuda yang hanya berpura-pura menjadi kekuatan dalam bayang-bayang ... bawahannya yang menganggapnya lebih serius dari yang dia harapkan ... dan organisasi raksasa dalam bayang-bayang yang tanpa sengaja diinjak-injak ...\nIni adalah kisah tentang seorang anak laki-laki yang memuja kekuatan dalam bayang-bayang yang mungkin pada akhirnya menguasai dunia bayangan di dunia lain.",
        "spoilers": ["https://i2.wp.com/samsudin.b-cdn.net/data/923915/01/YBHnCVEgXdjszia/jiVSWEoD3m6TEEf007.webp"],
        "chapter_list": [
            {
                "name": "Chapter 46",
                "episode": "kage-no-jitsuryokusha-ni-naritakute-chapter-46/",
                "date": "3 minggu yang lalu"
            },
        ],
        "image": "https://cdn.kena-blok.xyz/uploads/2021/01/Komik-Kage-no-Jitsuryokusha-ni-Naritakute.jpg"
    }
}
```
### Details Chapter Comic
#### Endpoint
```http
POST /manga/details
```
#### Payload
| Parameter | Type | Description | Example
| :--- | :--- | :--- | :--- |
| `url` | `string` | Comic details url | `kage-no-jitsuryokusha-ni-naritakute-chapter-02`
#### Response
```json
{
    "data": {
        "title": "Komik Kage no Jitsuryokusha ni Naritakute Chapter 02",
        "chapter": {
            "next": "kage-no-jitsuryokusha-ni-naritakute-chapter-03/",
            "previous": "kage-no-jitsuryokusha-ni-naritakute-chapter-01/"
        },
        "images_list": [
            "https://5ln1h5525y2q.kentut.xyz/data/923915/02/cYPS1PWksgjPlTv/2KYYF8L0mOUJdyl001.webp",
        ]
    }
}
```
## License
[MIT License](https://github.com/fuainaru/komikindo-api/blob/main/LICENSE) - Fuainaru.
