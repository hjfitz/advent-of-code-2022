
function findDistinct(input: string, packetSize: number): number {
	const inputArr = input.split('')
	for (let i = 0; i < inputArr.length; i++) {
		const subPacket = inputArr.slice(i, i + packetSize)
		if (subPacket.length != packetSize)
			return -1
		if ([...new Set(subPacket)].length === packetSize)
			return i + packetSize
	}
	return -2

}

const partOne = (input: string) => findDistinct(input, 4)
const partTwo = (input: string) => findDistinct(input, 14)

console.log(partOne('pfptpztzfznzzznszzfgzgqgbgzgmzggwlwnlngnddjttzwtwmttlrrlqqzczpzhppmjmnjnfjnjjjprpfpnfpnpznzbbnwbbdsbswwwwszzzcmcttbftffczctztffppcvccbdbhbtbcbhbrbnrbrzbztbblvlvqvcqvcvcrcprrmffhfwfjwjrjtttvqqsttcwtthwthhqssbbqhhcbhbhqqwsqspqspprbrsrmmvhvvlsvspvpddbvdbdhhgshggfbgbrggzszsnshsvhsvhhnfnhfnhhbzzthtstdssdsrdsrdrtddsrdrcrgcgdcggdbbtgbgzbzwwnlngggspggspspjjfqflqqttjbbnffszfzjjlwjwhjwjccpllzztrzttdpdbbcnntwnnctnnrrgbrbvbccvzvlvnllvrvnnvmmtrmrddjdqdrqrmmvssgllsjsrrwggvcccgwwgddzldzldzdttqrrtggdngdgfdgfgzztdtthrttszzgjglldzdhdphppjfjfzfpfsflfggpwwwjdjssqdqmdmdpmmvbvfvpfpfwfpwfppbgbwgbbpmpwpzplpjpttnwnlnppcvchhmwwmllwppwspwspswpphhdhfhccwpcplpzzjwjssfrsssgnglnglnglngncgcvvpddrcrjrssznnjllslrlmllglpggwhhllzqzssvtsvvbpphpthphdhphnhdhdqdbbmcmqcmcmddtwtqqsbbzddtzdzrzmmfccdttlvljlffzczmzrrtzzrbrllfnfmfnnrcnnctcnnncbcrbccwcnwcnnrbnrrpnprrtwwvcwchwwcbwwwnpnvvgtvvqmvvhttrnnvjjtwtfwtwrrbpbmbmzmpphwphwwqwgwlwclwccjvccsllhhrtrstthvvfjjcvcdcbdcbczcttjbttwtvvvzjzgzwgwjjsnnvrrlbrrvnvdvhvchvvglvvpssdbsszddsqsspvpbpjjgghvvlwvlvggpjjmcjmmmhjmmrgrsgrsggchhcmmqsmsttlslqqmjjbpbrrcnrnbbvqvsvtvftvtmmqzzsnscsffnrnmrmnnszsllsrrrzrszsbbchccsrsmshhzrhrrdlrrjfmlrfhvqqvmpbrntgcqqsqvjmtctflbffddfbsjvzsfdwblprszhfvltwtcfsbdlwjgsmlcrvgstjqtrtnqzbmrmgqnscqjdfnbppcdgcsstwdmdvphsqmrfmzwntjgjjvcdgbhfjqlzglgjdsdlhwwrmfqcfsvhwwfmvprpnmjppvwzjwmddtndspzqjqrpbpnrjfwqfvbtqrgngcbjvhnfbtslcpppbsfhbcmwgpccftwhnbvdrzqdtwnrtjcdlnlmhvlzvljwrzgtfjrpgzjvggtpsvcdgtsvhdzvtfbwmnptfmllgcvfmmgvpbrgnhcnpwltqmjmltsbpzmfrttsmjqwhncvtqrsmcpsnrqzmwftbltllbhzhdfzmfgbvdtgwpvngsffjmwhfhmccfrjgqcqngzlnqvsgrcdzbsmjbmflwvhjldlrdvjrmgvjvpcczdhczpbtwphvhqmhcnljbwnzqwmbctffmctlcmhzcnvprdhtzdvgbhlnnjqzcwcsrgzjjlszssnplwqjlczvftmnbnmdpbjnctnslhgsjswqjwvprdstvbstlnnwwgvsffwmprjrlfccmtgvqbghvhcngwwtzwbwcdmrfstwhtfghgvzbfgtwjglcllwrhgdzptvrrbdhbscjhmtswshjmrsbpzstwmhrwwwncbbmjnjjlzrpdrzfvstbltszvlhcqbcpgbwtzzslsrljmhmtlcvzdbszvnjhrswrjrmfpsfpplwlrsnrpnjngmhwpwqcmtslhbmlsmjhcgmzznftmhvtmzlvmcwnbqtcntqghrqcsztsgzrnmrlvrnhtpmstdflpztmwltvgppttfwhhzzgrffjchswhbljvcjwvvnqnvdvjpsclhwsrtczvjmtcsnwvnwtdllphmrthddfvcjwvggqltmhglllmqzjsbjwgdqwzzmjnrmpbqplgzjgzcdqmtsntprdwwjwthcbsghqqspszndgqdmlzdlzwfcghtbhcqpbpmnfgqzmhtnttvjttvzhllsjvmmcmmppcgssjhnzqwpzdbtmrzsfbvgmgbtbwjrzvdlmgjpzltfmcclpltsszpqbllrwbwsnbhhvfwphrcpdvbjhgmgpphrdpcmjvfsjzrqldlqthwsztzcgttdnzcsbnszcsvmcspddlmwjttggdmlpqrdrfmwfzpdbnrwtmwssvbwtmzhndmhzwtlgdwpbrzghmlbszswqlpzldbvswjgtvjvmtjwdggfsbggbwhpwjdmflhmsgtbzrtbvlpqqmpcrbhflnfmwwsvdsgnnznfrqhqgqfgdfzcdqrtdftsntpbcclhncqjjwvszmssswnscwjlpfvdvltgcmqqttnfvbptbbmlrvrwwfbwwbvlrdrfmscqwdvdjgdrghwfjsttvwngzttzzsmzqnvzdfsvrbrcwtmmjdvnzjzdsnzgtszzcwdphnjmspmdsrqwgdwlzrgghcchpbltmwnjrbhqhzdqqmbrpggjjwnqfnnsqsfzbwqjsfprvrvfwbqvhgpjvqzplnhtqszqrtsvtbptfvzmvjhshbtmqbmqrrwplzphvdvhttlmftdwltqssstzlvnslzhnmjdlsbdprbgpjvcdtcfchzqqqcnngbrmntjwfbvcdcfgbcpnvcbbcvhqfzpsmgbcvrqvjlqlqnvvzdgphfpgtrpbbwztvqjgdpnpwbffdgqzmqvgblwzmdrhwdprhcqppcggrldhcdztnhspclfcwttnqslnzvvshcwgfztvscvztdrprvnlmfsgcpfdmfjgblnhrbsmjrjdzjwvwmlllvscsvfqvhdsdljrqphcvvtcttbwvnwwzwshdcfdqnjszltmddzjgmqgvpjzpzssrmfsrgjhvqtlhsfnndnqhpbcnltmdvlhfwqcmwnqbhsfqqwnfnnfjjbsqmcdrrvlfztdprnmjfhlvcdbjtczbrpljmpcwvchdwrqbwggjnrlhcdgzfwjzzjgfnbpwbpvswqdpcrthwfcffgztrjqntczfcbsrrtrjrwgbbgjshtzvjjlqqtsbgmpsttqjqwgmmbzhshqvvrcgbdsqmtqlrgjbnvbrpzdrgqnzstfdcvdnjhcnjblmsqtfvstlptgrczhbgpllpqwfdmthgjlltmlnltzpvjvjfgtrzslsptlfplgrgpjsbhbbbwlljfdjnhqcndlprfbwpvddndpnqwqccgbqmwlrffpzjpqclwcrgjgljwzpppwltcwdqdchghfnwbhrjndjsvlqnnmlrjfgfpnvgmlhbgnhnztpjzdmltfmjtzclsbspvhfngtjmzwrwmprdfplzzwfrdnbmbgvjlczcdvmpfmtqmzjrpfhjwwzmtnzmptwnhtlbndcpshqrqqrpccqpnvnqqdprvccmdmrsbptdhrhlpcptgfsfwphfpvbcrlnbrtgwcpgjclhhvpjhcwcgghlzbmpbswgtzqhmlwdfrrdfvnbhlqhvhnfjfndlqgrvhwnnnccvgdfqtwlmbwcpdtgscfpvmbdtcdmmgqrfjvnhngqsdtzhlbjwrrcrjfswwrgbhznlwhcjlsfprbqqcqmbdjhgjmmtqmjpldgqvptqcwjmlrjtjwdfbbvhpsnmfvdwnrntqzhfgfmrtgwgddpqvvdjqvrdwdwrsbjlbrmrjjbbpjpqgsjdzfjcrsnbmtmrstcrztzhgswgghwbfltdsvrcqvvjtmjwznnnwtsmshvbbpzwltrjpmbgsbqwphmwlhgpltsgjmgbdfrlhcbfjnvpvdwzccgdhswtgplcqnsjdwfbhbbpssvfrjbzmcphzjdncjgsvrcrplhqpnwdgfvrjqgfshdwrqjdvjmggtnnghqrccgddnzndcgpgpghtvrpwftfpttvgwqqcjbvnmqzlshdrdj'))
console.log(partTwo('pfptpztzfznzzznszzfgzgqgbgzgmzggwlwnlngnddjttzwtwmttlrrlqqzczpzhppmjmnjnfjnjjjprpfpnfpnpznzbbnwbbdsbswwwwszzzcmcttbftffczctztffppcvccbdbhbtbcbhbrbnrbrzbztbblvlvqvcqvcvcrcprrmffhfwfjwjrjtttvqqsttcwtthwthhqssbbqhhcbhbhqqwsqspqspprbrsrmmvhvvlsvspvpddbvdbdhhgshggfbgbrggzszsnshsvhsvhhnfnhfnhhbzzthtstdssdsrdsrdrtddsrdrcrgcgdcggdbbtgbgzbzwwnlngggspggspspjjfqflqqttjbbnffszfzjjlwjwhjwjccpllzztrzttdpdbbcnntwnnctnnrrgbrbvbccvzvlvnllvrvnnvmmtrmrddjdqdrqrmmvssgllsjsrrwggvcccgwwgddzldzldzdttqrrtggdngdgfdgfgzztdtthrttszzgjglldzdhdphppjfjfzfpfsflfggpwwwjdjssqdqmdmdpmmvbvfvpfpfwfpwfppbgbwgbbpmpwpzplpjpttnwnlnppcvchhmwwmllwppwspwspswpphhdhfhccwpcplpzzjwjssfrsssgnglnglnglngncgcvvpddrcrjrssznnjllslrlmllglpggwhhllzqzssvtsvvbpphpthphdhphnhdhdqdbbmcmqcmcmddtwtqqsbbzddtzdzrzmmfccdttlvljlffzczmzrrtzzrbrllfnfmfnnrcnnctcnnncbcrbccwcnwcnnrbnrrpnprrtwwvcwchwwcbwwwnpnvvgtvvqmvvhttrnnvjjtwtfwtwrrbpbmbmzmpphwphwwqwgwlwclwccjvccsllhhrtrstthvvfjjcvcdcbdcbczcttjbttwtvvvzjzgzwgwjjsnnvrrlbrrvnvdvhvchvvglvvpssdbsszddsqsspvpbpjjgghvvlwvlvggpjjmcjmmmhjmmrgrsgrsggchhcmmqsmsttlslqqmjjbpbrrcnrnbbvqvsvtvftvtmmqzzsnscsffnrnmrmnnszsllsrrrzrszsbbchccsrsmshhzrhrrdlrrjfmlrfhvqqvmpbrntgcqqsqvjmtctflbffddfbsjvzsfdwblprszhfvltwtcfsbdlwjgsmlcrvgstjqtrtnqzbmrmgqnscqjdfnbppcdgcsstwdmdvphsqmrfmzwntjgjjvcdgbhfjqlzglgjdsdlhwwrmfqcfsvhwwfmvprpnmjppvwzjwmddtndspzqjqrpbpnrjfwqfvbtqrgngcbjvhnfbtslcpppbsfhbcmwgpccftwhnbvdrzqdtwnrtjcdlnlmhvlzvljwrzgtfjrpgzjvggtpsvcdgtsvhdzvtfbwmnptfmllgcvfmmgvpbrgnhcnpwltqmjmltsbpzmfrttsmjqwhncvtqrsmcpsnrqzmwftbltllbhzhdfzmfgbvdtgwpvngsffjmwhfhmccfrjgqcqngzlnqvsgrcdzbsmjbmflwvhjldlrdvjrmgvjvpcczdhczpbtwphvhqmhcnljbwnzqwmbctffmctlcmhzcnvprdhtzdvgbhlnnjqzcwcsrgzjjlszssnplwqjlczvftmnbnmdpbjnctnslhgsjswqjwvprdstvbstlnnwwgvsffwmprjrlfccmtgvqbghvhcngwwtzwbwcdmrfstwhtfghgvzbfgtwjglcllwrhgdzptvrrbdhbscjhmtswshjmrsbpzstwmhrwwwncbbmjnjjlzrpdrzfvstbltszvlhcqbcpgbwtzzslsrljmhmtlcvzdbszvnjhrswrjrmfpsfpplwlrsnrpnjngmhwpwqcmtslhbmlsmjhcgmzznftmhvtmzlvmcwnbqtcntqghrqcsztsgzrnmrlvrnhtpmstdflpztmwltvgppttfwhhzzgrffjchswhbljvcjwvvnqnvdvjpsclhwsrtczvjmtcsnwvnwtdllphmrthddfvcjwvggqltmhglllmqzjsbjwgdqwzzmjnrmpbqplgzjgzcdqmtsntprdwwjwthcbsghqqspszndgqdmlzdlzwfcghtbhcqpbpmnfgqzmhtnttvjttvzhllsjvmmcmmppcgssjhnzqwpzdbtmrzsfbvgmgbtbwjrzvdlmgjpzltfmcclpltsszpqbllrwbwsnbhhvfwphrcpdvbjhgmgpphrdpcmjvfsjzrqldlqthwsztzcgttdnzcsbnszcsvmcspddlmwjttggdmlpqrdrfmwfzpdbnrwtmwssvbwtmzhndmhzwtlgdwpbrzghmlbszswqlpzldbvswjgtvjvmtjwdggfsbggbwhpwjdmflhmsgtbzrtbvlpqqmpcrbhflnfmwwsvdsgnnznfrqhqgqfgdfzcdqrtdftsntpbcclhncqjjwvszmssswnscwjlpfvdvltgcmqqttnfvbptbbmlrvrwwfbwwbvlrdrfmscqwdvdjgdrghwfjsttvwngzttzzsmzqnvzdfsvrbrcwtmmjdvnzjzdsnzgtszzcwdphnjmspmdsrqwgdwlzrgghcchpbltmwnjrbhqhzdqqmbrpggjjwnqfnnsqsfzbwqjsfprvrvfwbqvhgpjvqzplnhtqszqrtsvtbptfvzmvjhshbtmqbmqrrwplzphvdvhttlmftdwltqssstzlvnslzhnmjdlsbdprbgpjvcdtcfchzqqqcnngbrmntjwfbvcdcfgbcpnvcbbcvhqfzpsmgbcvrqvjlqlqnvvzdgphfpgtrpbbwztvqjgdpnpwbffdgqzmqvgblwzmdrhwdprhcqppcggrldhcdztnhspclfcwttnqslnzvvshcwgfztvscvztdrprvnlmfsgcpfdmfjgblnhrbsmjrjdzjwvwmlllvscsvfqvhdsdljrqphcvvtcttbwvnwwzwshdcfdqnjszltmddzjgmqgvpjzpzssrmfsrgjhvqtlhsfnndnqhpbcnltmdvlhfwqcmwnqbhsfqqwnfnnfjjbsqmcdrrvlfztdprnmjfhlvcdbjtczbrpljmpcwvchdwrqbwggjnrlhcdgzfwjzzjgfnbpwbpvswqdpcrthwfcffgztrjqntczfcbsrrtrjrwgbbgjshtzvjjlqqtsbgmpsttqjqwgmmbzhshqvvrcgbdsqmtqlrgjbnvbrpzdrgqnzstfdcvdnjhcnjblmsqtfvstlptgrczhbgpllpqwfdmthgjlltmlnltzpvjvjfgtrzslsptlfplgrgpjsbhbbbwlljfdjnhqcndlprfbwpvddndpnqwqccgbqmwlrffpzjpqclwcrgjgljwzpppwltcwdqdchghfnwbhrjndjsvlqnnmlrjfgfpnvgmlhbgnhnztpjzdmltfmjtzclsbspvhfngtjmzwrwmprdfplzzwfrdnbmbgvjlczcdvmpfmtqmzjrpfhjwwzmtnzmptwnhtlbndcpshqrqqrpccqpnvnqqdprvccmdmrsbptdhrhlpcptgfsfwphfpvbcrlnbrtgwcpgjclhhvpjhcwcgghlzbmpbswgtzqhmlwdfrrdfvnbhlqhvhnfjfndlqgrvhwnnnccvgdfqtwlmbwcpdtgscfpvmbdtcdmmgqrfjvnhngqsdtzhlbjwrrcrjfswwrgbhznlwhcjlsfprbqqcqmbdjhgjmmtqmjpldgqvptqcwjmlrjtjwdfbbvhpsnmfvdwnrntqzhfgfmrtgwgddpqvvdjqvrdwdwrsbjlbrmrjjbbpjpqgsjdzfjcrsnbmtmrstcrztzhgswgghwbfltdsvrcqvvjtmjwznnnwtsmshvbbpzwltrjpmbgsbqwphmwlhgpltsgjmgbdfrlhcbfjnvpvdwzccgdhswtgplcqnsjdwfbhbbpssvfrjbzmcphzjdncjgsvrcrplhqpnwdgfvrjqgfshdwrqjdvjmggtnnghqrccgddnzndcgpgpghtvrpwftfpttvgwqqcjbvnmqzlshdrdj'))
