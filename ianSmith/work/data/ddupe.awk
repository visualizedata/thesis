{
if($0 in  word_list)
	next
else
	word_list[$0] = $0
}
END{for (i in word_list)
		print word_list[i]
	}

