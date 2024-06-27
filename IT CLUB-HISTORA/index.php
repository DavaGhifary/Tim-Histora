<?php
session_start();

if (!isset($_COOKIE['username']) && !isset($_SESSION['username'])) {
    header("location:login.php");
}

$config = mysqli_connect('localhost', 'root','', 'eskul');

if (!$config){
    echo "error";
    die();
}
$query = 'SELECT * FROM anggota';
$datas = mysqli_query($config, $query);

$page = isset($_GET['page']) ? $_GET['page'] : 1;
$load = 10;

$data = mysqli_query($config, 'SELECT * FROM anggota');
if (isset($_GET['search'])) {
    if (!empty($_GET['search'])) {
        $nama = $_GET['search'];
        $datas = mysqli_query($config, "SELECT * FROM anggota WHERE nama LIKE '%$nama%' OR jurusan LIKE '%$nama%' OR kelas LIKE '%$nama%' OR nis LIKE '%$nama%'");
    } else {
        $datas = $data;
    }
} else {
    $limit = $page * $load - $load;
    $datas = mysqli_query($config, "SELECT * FROM anggota LIMIT $limit, $load");

    $paginate = ceil(count($data->fetch_all()) / $load);
}

$i = 0;

?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        th {
            background-color: aqua;
        }
        .active {
            font-weight: bold;
            color: red;
        }
        #edit {
            background-color: #16FF00;
            color: white;
            border: none;
        } 
        #delete {
            background-color: red;
            color: white;
            border: none;
        }
    </style>

</head>

<body>

<a href="logout.php">logout</a>



<form action="" method="GET">
    <input type="text" name="search">
    <button type="submit">Cari</button>
</form>
<br>
<a href="tambah.php"><button class="btn">Tambah Data</button></a>
<br>
<br>

<table border="1" cellspacing="0">
<thead>
    <tr>
        <th>no</th>
        <th>nama</th>
        <th>jurusan</th> 
        <th>kelas</th>
        <th>nis</th> 
        <th>Action</th>

    </tr>
</thead>
<tbody>
    <?php foreach ($datas as $key => $value):?>
        <?php $i++ ?>
    <tr>
        <td><?php echo $i + $limit; ?></td>
        <td><?= $value['nama'];?></td>
        <td><?= $value['jurusan'];?></td>
        <td><?= $value['kelas'];?></td>
        <td><?= $value['nis'];?></td>
        <td>
        <a href="edit.php?id=<?= $value['no']?>"><button id="edit">Edit</button></a>
        <a href="delete.php?id=<?= $value['no']?>"><button id="delete">Delete</button></a>
        </td>
    </tr>
    <?php endforeach; ?>
</tbody>
</table>

<div>
    <?php for ($i = 1; $i <= $paginate; $i++) : ?>
        <button><a href="?page=<?= $i ?>" class="
        <?php
        if (isset($_GET['page'])) {
            if ($_GET['page'] == $i) {
                echo 'active';
            }
        }else if ($i === 1) {
            echo 'active';
        }

        ?>"><?= $i ?></a></button>
        <?php endfor; ?>
</div>


    
</body>
</html>
