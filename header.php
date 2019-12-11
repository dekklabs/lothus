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
	<!-- <link rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/dist/main.css"> -->
</head>
<body <?php body_class(); ?>>
	<main id="main">
		<header class="navbar navbar-expand-lg">
			<div class="container">
				<a class="navbar-brand" href="<?php echo get_site_url(); ?>">
					<img src="<?php echo esc_url( get_template_directory_uri() );?>/dist/img/portada/logo.png" alt="herramientas-img">
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<i class="fas fa-bars"></i>
				</button>
				<nav class="collapse navbar-collapse" id="navbarSupportedContent">
					<div class="ml-auto">
						<?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>
					</div>
				</nav>
			</div>
		</header>