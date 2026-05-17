<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Authors</title>
</head>
<body>
    <h1>Data Author</h1>

    @foreach($authors as $author)
    <div>
        <h3>{{ $author['name'] }}</h3>
        <p>{{ $author['bio'] }}</p>
    </div>
    @endforeach
</body>
</html>