<meta http-equiv="Content-Type" content="text/html"; charset=utf-8"/>

<?php
/**
 * Created by PhpStorm.
 * User: Anderson
 * Date: 24/12/2017
 * Time: 11:42
 */
//Variavel dinâmica para pegar a navegação.
$baseDir = 'upload/';
$abreDir = ($_GET['dir'] != "" ? $_GET['dir'] : $baseDir);
//determina que o botão 'voltar' volte sempre uma pasta anterior e nao no inicio removendo a'/'
$strrdir = strrpos(substr($abreDir,0,-1),'/');
//determina que o botão 'voltar' volte sempre uma pasta anterior e nao no inicio adicionando a'/'
$backdir = substr($abreDir,0,$strrdir+1);


//determinando que é um diretorio.
$openDir =  dir($abreDir);
//impede a repetição no abrimento da tabela.
echo '<table width="500" border="1" cellspacing="0" cellpadding="5">';
//repete somente oqu esta dentro do while
    while($arq = $openDir -> read()):
        //verifica se é arquvio ou pasta
        if ($arq != '.' && $arq != '..') :
            if(is_dir($abreDir.$arq)){
            //se for pasta executa aqui.
                echo '<tr>';
                //cria o numero de linhas de acordo com a a quantidade de arquivos.
                echo '<td>'.$arq.'</td>';
                echo '<td align="center"><a href="?dir='.$abreDir.$arq.'/">Abrir</a></td>';
                echo '</tr>';
                //se for arquivo executa aqui.
            }else {
                echo '<tr>';
                //cria o numero de linhas de acordo com a a quantidade de arquvos.
                echo '<td>'.$arq.'</td>';
                //visualiza a imagem direto na tela.
                //echo '<td><img src="'.$abreDir.$arq.'"></td>';
                //abre o link'ver' para visualizar a imagem.
                echo '<td align="center"><a href="'.$abreDir.$arq.'">Ver></a></td>';
                echo '</tr>';
            }
        endif;

    endwhile;
//impede a repetição no fechamento da tabela.
echo'</table>';

if($abreDir != $baseDir){
    echo '<a href="?dir='.$backdir.'">Voltar</a>';
}

$openDir->close()
?>
    <br><br>
     <a href="?dir=">Inicio</a>