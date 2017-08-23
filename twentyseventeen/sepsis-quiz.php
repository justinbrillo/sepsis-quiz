<?php
/**
 * Template Name: SepsisQuiz
 */
wp_head(); ?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sepsis</title>
    <link href="http://meyerweb.com/eric/tools/css/reset/reset.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500" rel="stylesheet">
    <link href="https://cdn.rawgit.com/FortAwesome/Font-Awesome/master/css/font-awesome.min.css" rel="stylesheet">
</head>

<body>
<div class="main-container">
    <div id="questions_container" class="question-container">
        <!-- QUESTION -->
        <div class="question-container">
            <div class="question-number">Question</div>
            <div class="under-card-top under-card-top-hide"></div>

            <!-- MAIN CARD -->
            <div class="card-container">
                  <div class="question">Question</div>
                  <div class="choices">
                  </div>
            </div>

            <!-- BOTTOM CARD -->
            <div class="under-card-bottom-container">
                <div class="under-card-bottom under-card-bottom-reveal">
                    <div>Fact</div>
                    <div class="learn-more"><a href="" target="_blank">Learn More <i class="fa fa-angle-right" aria-hidden="true"></i>
        </a></div>
                </div>
            </div>
        </div>
        <!-- END OF QUESTION -->
    </div>

    <!-- SHARE -->
    <div id="share_container" class="share-container"></div>
    <!-- END OF SHARE -->
</div>


</body>
</html>

<?php wp_footer();

