BEGIN{FS=":"};
{
	printf("\"%s\":",$1);
	$1="";
	printf("\"%s\"\,\n",$0)
}

