<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Genres</title>
</head>
<body>
    <h1>ini adalah halaman dari genres </h1>
        @foreach($genres as $genre)
        <p>
            <b>{{ $genre['name'] }}</b> - {{ $genre['description'] }}
        </p>
        @endforeach
</body>
</html>