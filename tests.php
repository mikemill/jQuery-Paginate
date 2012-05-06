<!DOCTYPE html>
<html>
	<head>
		<title>jQuery Pagination Tests</title>
		<link rel="stylesheet" href="jquery.pagination.css">
	</head>
	<body>
<?php

	echo '
		<table>
			<caption>Single Page Table</caption>
			<thead>
				<tr>
					<th>Header 1</th>
					<th>Header 2</th>
					<th>Header 3</th>
				</tr>
			</thead>
			<tbody id="table-single">';

	for ($i = 0; $i < 20; $i++)
		echo '
				<tr>
					<td>Cell ', $i, ' - 1</td>
					<td>Cell ', $i, ' - 2</td>
					<td>Cell ', $i, ' - 3</td>
				</tr>';
			
	echo '
			</tbody>
		</table>
		<div id="table-single-pager"></div>
		<table>
			<caption>Single Page Nohide Table</caption>
			<thead>
				<tr>
					<th>Header 1</th>
					<th>Header 2</th>
					<th>Header 3</th>
				</tr>
			</thead>
			<tbody id="table-single-nohide">';

	for ($i = 0; $i < 20; $i++)
		echo '
				<tr>
					<td>Cell ', $i, ' - 1</td>
					<td>Cell ', $i, ' - 2</td>
					<td>Cell ', $i, ' - 3</td>
				</tr>';
			
	echo '
			</tbody>
		</table>
		<div id="table-single-nohide-pager"></div>
		<table>
			<caption>Many Page Table</caption>
			<thead>
				<tr>
					<th>Header 1</th>
					<th>Header 2</th>
					<th>Header 3</th>
				</tr>
			</thead>
			<tbody id="table-many">';

	for ($i = 0; $i < 20*5; $i++)
		echo '
				<tr>
					<td>Cell ', $i, ' - 1</td>
					<td>Cell ', $i, ' - 2</td>
					<td>Cell ', $i, ' - 3</td>
				</tr>';
			
	echo '
			</tbody>
		</table>
		<div id="table-many-pager"></div>
		
		<p>UL Single Page</p>
		<ul id="ul-single">';

	for ($i = 0; $i < 20; $i++)
		echo '
			<li>Item ', $i, '</li>';

	echo '
		</ul>
		<div id="ul-single-pager"></div>
		
		<p>UL Single Page Nohide</p>
		<ul id="ul-single-nohide">';

	for ($i = 0; $i < 20; $i++)
		echo '
			<li>Item ', $i, '</li>';

	echo '
		</ul>
		<div id="ul-single-nohide-pager"></div>
		
		
		<p>UL Many Page</p>
		<ul id="ul-many">';

	for ($i = 0; $i < 20*5; $i++)
		echo '
			<li>Item ', $i, '</li>';

	echo '
		</ul>
		<div id="ul-many-pager"></div>

		<p>UL Defaulter Pager</p>
		<ul>';

	for ($i = 0; $i < 20*5; $i++)
		echo '
			<li>Item ', $i, '</li>';

	echo '
		</ul>
		<div id="pager"></div>

		<p>A div with &lt;p&gt; children?  Sure, why not.</p>
		<div id="div-with-p">';

	for ($i = 0; $i < 20 * 5; $i++)
		echo '
			<p>P #', $i, '</p>';

	echo '
		</div>
		<div id="div-with-p-pager"></div>';
?>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script src="jquery.pagination.js"></script>
		<script>
			$(function()
			{
				$('table tbody, ul').filter(function(){return this.id.indexOf('-nohide') == -1;}).paginate({
					redraw: function()
					{
						console.log('regular redraw');
						$('.pager-page-current').click();
					},
				});
				$('table tbody, ul').filter(function(){return this.id.indexOf('-nohide') != -1;}).paginate({
					redraw: function()
					{
						console.log('nohide redraw');
						$('.pager-page-current').click();
					},
					singlePageHide: false,
				});

				$('#div-with-p').paginate();

				$('#ul-single-nohide').paginate('redraw');
			});
		</script>
	</body>
</html>