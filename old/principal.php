<!doctype html>
<html lang="pt">
    <head>
        <title>@nome</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <link type="text/css" rel="stylesheet" href="style/style.css">
    </head>

    <body>
        <div class="page">
            <header class="header">
                <div class="logo">
                    <span>Logo</span>
                </div>
                <div class="search">
                    <input type="text" name="q" class="inputSearch" placeholder="Pesquisar" />
                    <div class="btnBuscar"></div>
                </div>
                <div class="btnUpload" >

                </div>
                <div class="userInfo">
                    <span class="userName">Usuário</span>
                    <div class="userPhoto"></div>
                </div>
            </header>
            <!-- Barra lateral -->
            <aside class="sideBar">
                <a class="btnNewFolder" href="">
                    <div class="newFolder">
                            <img src="img/iconMore.png">
                            <p>Nova Pasta</p>
                    </div>
                </a>

                <ul class="folder">
                    <?php 
                        // import class list_of_folders
                        require_once 'list_of_folders.php';
                        // condição para verificar se foi declarado $GET['dir']
                        $dir = isset($_GET['dir']) ? $_GET['dir'] : null;
                        // declare class Folders
                        $folders = new Folders($dir);
                        
                        // função p/ mostrar pastas superiores com a possibilidade de rotena até elas
                        $backDir = $folders->getBackDir();
                        echo "<li>";
                        for($i=0; $i < count($backDir); $i++){
                            // costrução do link para voltar a pasta
                            if($backDir[$i] != "" && $backDir[$i] != $folders->getCurrentFolder()){
                                echo "<a href='?dir=";
                                for($x = 0; $x < $i; $x++){
                                    echo $backDir[$x]."/";
                                }
                                echo $backDir[$i]."/'>".$backDir[$i]."</a>/";
                            }
                        }
                        echo $folders->getCurrentFolder()."</li>";

                        // show list of folders
                        foreach($folders->folders as $folder){
                            echo "<a href='?dir=".$folders->getDirectory().$folder."/'><li><img src='img/Folder.png'>$folder</li></a>";
                        }
                    ?>
                </ul>

            </aside>
            <!-- Conteudo: pastas, docs... -->
            <section class="content">
                <div><img>
                    <!-- Dropzone no index -->
                    <script src="JavaScript/dropzone.js"></script>
                    <link rel="stylesheet" href="style/dropzone.css">
                    <form action="upload.php" class="dropzone" id="my-dropzone"></form>
                    <form action="upload.php" method="post" enctype="multipart/form-data"/>
                    <form action="upload.php" class="dropzone"/>

                </div>
            </section>
        </div>
    </body>
</html>