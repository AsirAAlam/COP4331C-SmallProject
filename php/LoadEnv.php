<?php

class LoadEnv {
        private $path;
        private $keyPath;

        public function __construct(string $path, string $keyPath) {
                $this->path = $path;
                $this->keyPath = $keyPath;
        }

        private function decrypt() :string {
                $keyFile = fopen($this->keyPath, 'r');
                $enc = fopen($this->path, 'r');

                $key = fread($keyFile, filesize($this->keyPath));
                $encoded = fread($enc, filesize($this->path));
                $decoded = base64_decode($encoded);

                $nonce = mb_substr($decoded, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, '8bit');
                $encrypted = mb_substr($decoded, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, null, '8bit');
                $plaintext = sodium_crypto_secretbox_open($encrypted, $nonce, $key);

                fclose($keyFile);
                fclose($enc);
                return $plaintext;
        }

        public function load() :mysqli {
                $info = $this->decrypt();

                $sql_ar = array();
                $infoAr = explode("\n", $info);
                foreach ($infoAr as $row) {
                        if (empty($row))
                                continue;
                        list($key, $value) = explode("=", $row);
                        $sql_ar[trim($key)] = trim($value);
                }
                return (new mysqli($sql_ar['HOSTNAME'], $sql_ar['USERNAME'], $sql_ar['PASSWORD'], $sql_ar['DATABASE']));
        }
}
