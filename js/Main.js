$(document).ready(function(){ 
	$(".square").on("click", function() {
		if(selectOrMove){
			newSquare = this.id;
			toMove[0] = parseInt(this.id[1]-1);
			switch (this.id[0]) {
				case 'a':
					toMove[1] = 0;
				break;
				case 'b':
					toMove[1] = 1;
				break;
				case 'c':
					toMove[1] = 2;
				break;
				case 'd':
					toMove[1] = 3;
				break;
				case 'e':
					toMove[1] = 4;
				break;
				case 'f':
					toMove[1] = 5;
				break;
				case 'g':
					toMove[1] = 6;
				break;
				case 'h':
					toMove[1] = 7;
				break;
			}
			selectOrMove = false;
			testLegal(toBeMoved, toMove);
		} else {
			$(this).css("background-color", "#114B98");
			oldSquare = this.id;
			toBeMoved[0] = parseInt(this.id[1]-1);
			switch (this.id[0]) {
				case 'a':
					toBeMoved[1] = 0;
				break;
				case 'b':
					toBeMoved[1] = 1;
				break;
				case 'c':
					toBeMoved[1] = 2;
				break;
				case 'd':
					toBeMoved[1] = 3;
				break;
				case 'e':
					toBeMoved[1] = 4;
				break;
				case 'f':
					toBeMoved[1] = 5;
				break;
				case 'g':
					toBeMoved[1] = 6;
				break;
				case 'h':
					toBeMoved[1] = 7;
				break;
			}
			selectOrMove = true;
		}
	});
});

var turn = true;	
var selectOrMove = false;
var legal = false;
var toBeMoved = [-1,-1];
var toMove = [-1,-1];
var oldSquare = "";
var newSquare = "";

var white = 0;
var black = 1;
var pawn = 0;
var knight = 1;
var bishop = 2;
var rook = 3;
var queen = 4;
var king = 5;

var turn = white;
var fromPiece;
var toPiece;
var emptySquare = "";

var whiteShortCastle = 0;
var whiteLongCastle = 0;
var blackShortCastle = 0;
var blackLongCastle = 0;

function piece(color, type, rank, file, name, passant)
{
	this.color = color;
	this.type = type;
	this.rank = rank;
	this.file = file;
	this.name = name;
	this.passant = passant;
}

var wp1 = new piece(white, pawn, 1, 0, "wp1", false);
var wp2 = new piece(white, pawn, 1, 1, "wp2", false);
var wp3 = new piece(white, pawn, 1, 2, "wp3", false);
var wp4 = new piece(white, pawn, 1, 3, "wp4", false);
var wp5 = new piece(white, pawn, 1, 4, "wp5", false);
var wp6 = new piece(white, pawn, 1, 5, "wp6", false);
var wp7 = new piece(white, pawn, 1, 6, "wp7", false);
var wp8 = new piece(white, pawn, 1, 7, "wp8", false);

var wn1 = new piece(white, knight, 0, 1, "wn1", null);
var wn2 = new piece(white, knight, 0, 6, "wn2", null);
var wb1 = new piece(white, bishop, 0, 2, "wb1", null );
var wb2 = new piece(white, bishop, 0, 5, "wb2", null);
var wr1 = new piece(white, rook, 0, 0, "wr1", null);
var wr2 = new piece(white, rook, 0, 7, "wr2", null);
var wq = new piece(white, queen, 0, 3, "wq", null);
var wk = new piece(white, king, 0, 4, "wk", null);

var bp1 = new piece(black, pawn, 6, 0, "bp1", false);
var bp2 = new piece(black, pawn, 6, 1, "bp2", false);
var bp3 = new piece(black, pawn, 6, 2, "bp3", false);
var bp4 = new piece(black, pawn, 6, 3, "bp4", false);
var bp5 = new piece(black, pawn, 6, 4, "bp5", false);
var bp6 = new piece(black, pawn, 6, 5, "bp6", false);
var bp7 = new piece(black, pawn, 6, 6, "bp7", false);
var bp8 = new piece(black, pawn, 6, 7, "bp8", false);

var bn1 = new piece(black, knight, 7, 1, "bn1", null);
var bn2 = new piece(black, knight, 7, 6, "bn2", null);
var bb1 = new piece(black, bishop, 7, 2, "bb1", null);
var bb2 = new piece(black, bishop, 7, 5, "bb2", null);
var br1 = new piece(black, rook, 7, 0, "br1", null);
var br2 = new piece(black, rook, 7, 7, "br2", null);
var bq = new piece(black, queen, 7, 3, "bq", null);
var bk = new piece(black, king, 7, 4, "bk", null);

var board = [
	[wr1, wn1, wb1, wq, wk, wb2, wn2, wr2],
	[wp1, wp2, wp3, wp4, wp5, wp6, wp7, wp8],
	[emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, ],
	[emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, ],
	[emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, ],
	[emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, emptySquare, ],
	[bp1, bp2, bp3, bp4, bp5, bp6, bp7, bp8],
	[br1, bn1, bb1, bq, bk, bb2, bn2, br2]
];

function testLegal(from, to){

	fromPiece = board[from[0]][from[1]];
	toPiece = board[to[0]][to[1]];

	if(fromPiece == emptySquare){
		return;
	}
	if(toPiece != emptySquare && fromPiece.color == toPiece.color && fromPiece.color == turn){
		return;
	}

	if(fromPiece.type == pawn){
		if(fromPiece.color == white){
			if(from[0] == 1 && toPiece == emptySquare && to[0] == 3){
				from.passant = true;
				return move(fromPiece, from, to);
			} else if(from[0] == 4 && (to[1] - from[1] == 1 || to[1]-from[1] == -1) && to[0] == 5 && toPiece.passant === true){	
				return move(fromPiece, from, to);
			} else if(from[1] == to[1] && to[0] - from[0] == 1 && toPiece == emptySquare){
				return move(fromPiece, from, to);
			} else if((to[1] - from[1] == 1 || to[1]-from[1] == -1) && to[0] - from[0] == 1 && toPiece != emptySquare){
				return move(fromPiece, from, to);
			}
		} else if(fromPiece.color == black){
			if(from[0] == 6 && toPiece == emptySquare && to[0] == 4){
				from.passant = true;
				return move(fromPiece, from, to);
			} else if(from[0] == 3 && (to[1] - from[1] == 1 || to[1]-from[1] == -1) && to[0] == 2 && toPiece.passant === true){
				return move(fromPiece, from, to);
			} else if(from[1] == to[1] && to[0] - from[0] == -1 && toPiece == emptySquare){
				return move(fromPiece, from, to);
			} else if((to[1] - from[1] == 1 || to[1]-from[1] == -1) && to[0] - from[0] == -1 && toPiece != emptySquare){
				return move(fromPiece, from, to);
			}
		}
	} else if(fromPiece.type == knight){
		if(((from[1] - to[1] == 2 || from[1] - to[1] == -2) && (from[0] - to[0] == 1 || from[0] - to[0] == -1)) || ((from[1] - to[1] == 1 || from[1] - to[1] == -1) && (from[0] - to[0] == 2 || from[0] - to[0] == -2))){
			return move(fromPiece, from, to);
		}
	} else if(fromPiece.type == bishop){
		if(Math.abs(from[1] - to[1]) == Math.abs(from[0] - to[0])){
			return move(fromPiece, from, to);
		}
	} else if(fromPiece.type == rook){
		if(from[1] == to[1] || from[0] == to[0]){
			return move(fromPiece, from, to);
		}
	} else if(fromPiece.type == queen){
		if((from[1] == to[1] || from[0] == to[0])  || (Math.abs(from[1] - to[1]) == Math.abs(from[0] - to[0]))){
			return move(fromPiece, from, to);
		} 
	} else if(fromPiece.type == king){
		if(Math.abs(from[1] - to[1]) <= 1 && Math.abs(from[0] - to[0]) <= 1){
			return move(fromPiece, from, to);
		}
	}
}

function move(fromPiece, from, to){
	board[to[0]][to[1]] = fromPiece;
	board[from[0]][from[1]] = emptySquare;
	turn = !turn;
	updateBoard(oldSquare, newSquare, fromPiece);
	return;
}

function updateBoard(toEmpty, toChange, piece){
	$("#" + toEmpty).removeClass("black white pawn knight bishop rook queen king");
	$("#" + toChange).removeClass("black white pawn knight bishop rook queen king");
	if(piece.color === white){
		$("#" + toChange).addClass("white");
	} else {
		$("#" + toChange).addClass("black");
	}
	if(piece.type === pawn){
		$("#" + toChange).addClass("pawn");
	} else if(piece.type === knight){
		$("#" + toChange).addClass("knight");
	} else if(piece.type === bishop){
		$("#" + toChange).addClass("bishop");	
	} else if(piece.type === rook){
		$("#" + toChange).addClass("rook");
	} else if(piece.type === queen){
		$("#" + toChange).addClass("queen");
	} else if(piece.type === king){
		$("#" + toChange).addClass("king");
	}





}
