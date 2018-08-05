<?php
    class Folders {
        public $folders = array();
        private $directory = 'upload/';
        private $currentFolder;
        private $backdir;

        function __construct($url) {
            $strrdir = -1;
            if($url != 'upload/' && $url != null){
                $this->directory = $url;
                //determina que o botão 'voltar' volte sempre uma pasta anterior e nao no inicio removendo a'/'
                $strrdir = strrpos(substr($this->directory,0,-1),'/');
                //determina que o botão 'voltar' volte sempre uma pasta anterior e nao no inicio adicionando a'/'
                $this->backdir = substr($this->directory,0,$strrdir+1);
            } else {
                $this->directory = $this->directory;
            }
            // separa a string onde tem /
            $this->backdir = explode("/", $this->directory);

            // reconhece a pasta atual.
            $this->currentFolder = substr($this->directory, $strrdir+1, -1);

            $openDir = dir($this->directory);

            while($folder = $openDir -> read()){
                if($folder != '.' && $folder != '..'){
                    if(is_dir($this->directory.$folder))
                        $this->folders[] = $folder;
                }
            }
        }

        function getDirectory() {
            // retorna o diretorio
            return $this->directory;
        }
        function getCurrentFolder() {
            // retorna o nome do diretorio atual
            return $this->currentFolder;
        }
        function getBackDir() {
            // retorna uma array com diretorios superiores 
            return $this->backdir;
        }
    } // end class
?>