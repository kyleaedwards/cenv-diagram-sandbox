<!DOCTYPE html>
<html>
    <head>
        <title>flowboy | Collaborative Diagram Prototyping Tool</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta name="robots" content="noindex, nofollow">
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script src="js/socket.io.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
    </head>
    <body>
        <div id="header">
            <h1>flowboy</h1>
            <h2>Collaborative Diagram Prototyping Tool</h2>
        </div>
        <div id="contain">
            <canvas id="env-canvas"></canvas>
            <div id="env-core">
            </div>
            <div id="env-seed-options">
                <h3 id="env-seed-name">Item Name</h3>
                    <p id="env-seed-description">Insert Description Here</p>
                    Shape:<ul id="option-shape">
                        <li class="option-choice option-shape-square"></li>
                        <li class="option-choice option-shape-rounded-square selected"></li>
                        <li class="option-choice option-shape-circle"></li>
                    </ul>
                    Color:<ul id="option-color">
                        <li class="option-choice option-color-gray selected"></li>
                        <li class="option-choice option-color-blue"></li>
                        <li class="option-choice option-color-green"></li>
                        <li class="option-choice option-color-red"></li>
                    </ul>
                    Size:<ul id="option-size">
                        <li class="option-choice option-size-small"></li>
                        <li class="option-choice option-size-medium"></li>
                        <li class="option-choice option-size-large selected"></li>
                    </ul>
            </div>
            <aside id="env-error-overlay">
                <div id="env-error">Unable to connect to server. Please try again.</div>
            </aside>
            <aside id="env-key-overlay">
                <div id="env-key">
                    Diagram Key: <input id="env-diagram-key" type="text" pattern="[a-zA-Z0-9-_ ]{6,25}" />
                    <small>Type an existing key to load, type a new key to create a new diagram.</small>
                </div>
            </aside>
            <aside id="env-info"></aside>
            <script src="js/script.js?cb=<?php for ($i = 0; $i < 8; $i++) echo rand(0, 9); ?>"></script>
        </div>
    </body>
</html>