<?php
/**
 * Template Base - Desarrollado por Dekk
 *
 * @package WordPress
 * @subpackage Base
 * @since Base 1.0
 */

?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta name="description" content="Talleres" />
	<title><?php if(is_home()) { echo get_bloginfo("title"); } else { echo wp_title( '', true, 'right' ); } ?></title>
	<?php wp_head(); ?>
	<!-- <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dist/app.419c0a.css"> -->
</head>
<body <?php body_class(); ?>>
	<main id="main">
		<header class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container">
				<a class="navbar-brand" href="#">Navbar</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<nav class="collapse navbar-collapse" id="navbarSupportedContent">
					<?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>
				</nav>
			</div>
		</header>