**jQuery Pagination**

This is intended to be a simple jQuery based pagination.

-------------------------------------------------------------
**How to Contribute**

I welcome all code contributions.  The ideal method is to use GitHub's practice of forking the repository and making a pull request.
1. Fork the repository and clone it
2. Commit your changes making sure to sign-off that you certify the changes are under the license of the project per the [Developer Certificate of Origin](https://github.com/mikemill/jQuery-Paginate/blob/master/DCO.txt)
3. Push your changes to your repository
4. Create a pull request to the main repository.  See [Pull requests](http://help.github.com/send-pull-requests) for more information.

-------------------------------------------------------------

**Example usage:**

$('#sometable tbody').paginate();

If using the tablesorter plugin add the following to update the rows when sorting
$("#sometable").on('sortEnd', function(){$('#sometable tbody').paginate('redraw');});
